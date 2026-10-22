#!/usr/bin/env node
// Refresh the annual awards index from the public Awwwards API.
//
// The site publishes an OpenAPI document at https://www.awwwards.com/openapi.json
// with these read operations:
//   GET /api/annual/categories
//   GET /api/annual/categories/{id}
//   GET /api/annual/nominees
//   GET /api/annual/nominees/sites/{id}
//   GET /api/annual/nominees/users/{id}
//
// "Site of the Year", "E-commerce" and "Developer Site" nominate sites; "Agency",
// "Independent" and "Studio" nominate people. The script tries the site endpoint first
// and falls back to the user endpoint, because a 404 there is expected, not an error.
//
// It records metadata and links only. Descriptions, avatars and images stay on the site.
// Requests are sequential with a pause and bounded retries, so a refresh is not a burst.

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const BASE = "https://www.awwwards.com";
const UA = "awwwards-reference/1.0 (+local agent skill)";
const PAUSE_MS = 150;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(path, attempt = 0) {
  const res = await fetch(BASE + path, {
    headers: { "User-Agent": UA, Accept: "application/json" },
    signal: AbortSignal.timeout(30_000),
  });
  if (res.status === 429 || res.status >= 500) {
    if (attempt < 2) {
      await sleep(1000 * (attempt + 1));
      return getJson(path, attempt + 1);
    }
  }
  if (!res.ok) throw new Error(`${path} returned ${res.status}`);
  return res.json();
}

const unwrap = (body) => body?.data ?? body;
const attrs = (node) => node?.attributes ?? node;

async function nominee(id) {
  for (const kind of ["sites", "users"]) {
    try {
      const body = await getJson(`/api/annual/nominees/${kind}/${id}`);
      const a = attrs(unwrap(body));
      if (a?.slug) return { kind, a };
    } catch {
      // A site id is not a user id and the reverse. Trying both is the point.
    }
  }
  return null;
}

const rawCategories = await getJson("/api/annual/categories");
const categoryList = Array.isArray(rawCategories) ? rawCategories : unwrap(rawCategories);
console.log(`categories: ${categoryList.length}`);

const stamp = new Date().toISOString().slice(0, 10);
const sections = [];
let read = 0;
let missing = 0;

for (const entry of categoryList) {
  const { name, slug, nominees = [] } = attrs(entry);
  console.log(`${name}: ${nominees.length} nominees`);
  const rows = [];

  for (const id of nominees) {
    const found = await nominee(id);
    if (!found) {
      missing++;
      await sleep(PAUSE_MS);
      continue;
    }
    const a = found.a;
    if (found.kind === "sites") {
      rows.push(
        `- **${a.slug}** — site — ${a.country || "country not listed"} — ${a.designBy || "designer not listed"} — ${(a.date || "").slice(0, 10) || "date not listed"} — ${a.url || "no live link"} — ${a.awwwardsUrl || ""}`,
      );
    } else {
      rows.push(
        `- **${a.slug}** — person — ${a.location || "location not listed"} — ${a.awwwardsUrl || ""}`,
      );
    }
    read++;
    await sleep(PAUSE_MS);
  }

  sections.push(
    `## ${name}\n\nSlug: \`${slug}\`\nNominees listed: ${nominees.length}. Read: ${rows.length}.\n\n${rows.join("\n") || "No nominee detail was readable."}\n`,
  );
}

if (read === 0) {
  console.error("No nominee detail was readable. Nothing written.");
  process.exit(1);
}

const body = `# Awwwards annual awards, fetched ${stamp}

Built from the public API described at ${BASE}/openapi.json. Category names, nominee
slugs, countries, designers, locations and dates are the site's own fields.

Row format: \`name — kind — country or location — designer — date — live site — awards page\`.
Person rows stop at the awards page because they have no live site field.

Descriptions, avatars and images are deliberately left out. Open the awards page for those.

Regenerate with \`node scripts/refresh-api.mjs\`.

${sections.join("\n")}

## Totals

- Categories: ${categoryList.length}
- Nominees read: ${read}
- Nominees that could not be read from either endpoint: ${missing}
`;

const outDir = join(ROOT, "references");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `annual-awards-${stamp}.md`);
writeFileSync(outFile, body, "utf8");
console.log(`\nwrote ${outFile} (${read} read, ${missing} missing)`);

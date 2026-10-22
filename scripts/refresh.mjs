#!/usr/bin/env node
// Refresh the Awwwards winner index.
//
// Fetching goes through the agent-reach web backend (Jina Reader), because the site
// blocks plain automation and Jina returns clean markdown for a public page.
// Output is a dated snapshot. Nothing is invented: every row comes from a fetched page,
// and the script refuses to write a file when it parsed zero entries.

import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

const PAGES = {
  "Sites of the Day": "https://www.awwwards.com/websites/sites_of_the_day/",
  "All websites": "https://www.awwwards.com/websites/",
  "Portfolio": "https://www.awwwards.com/websites/portfolio/",
  "Animation": "https://www.awwwards.com/websites/animation/",
  "Nominees": "https://www.awwwards.com/websites/nominees/",
};

const UA = "Mozilla/5.0 (compatible; awwwards-reference/1.0; +local)";

async function fetchPage(url) {
  const res = await fetch("https://r.jina.ai/" + url, {
    headers: { "User-Agent": UA, Accept: "text/plain" },
    signal: AbortSignal.timeout(90_000),
  });
  if (!res.ok) throw new Error(`${url} returned ${res.status}`);
  return res.text();
}

// A card looks like:
//   *   [![Image 1: NAME](IMG)](https://www.awwwards.com/sites/slug)WEBSITE
//   NAME DEV
//   **Developer Award**  SOTD
//   **Site Of The Day**
//   Oct 21, 2026
function parseCards(markdown) {
  const cards = [];
  const chunks = markdown.split(/\n\* {3}\[!\[Image/).slice(1);
  for (const chunk of chunks) {
    const lines = chunk.split("\n");
    const head = lines[0] ?? "";
    const nameMatch = head.match(/^\s*\d+\s*:\s*([^\]]+)\]/);
    const linkInHead = head.match(/\]\((https:\/\/www\.awwwards\.com\/sites\/[^)]+)\)/);
    const nextLine = (lines[1] ?? "").trim();

    // Promoted slots carry an external link and are not awards.
    if (!linkInHead) continue;
    if (nextLine.includes("PROMOTED")) continue;

    const tail = lines.slice(0, 8).join("\n");
    const dateMatch = tail.match(/\b([A-Z][a-z]{2} \d{1,2}, \d{4})\b/);
    const awards = [...tail.matchAll(/\*\*([^*\n]+)\*\*/g)]
      .map((m) => m[1].trim())
      .filter((a) => a && !/^Image/.test(a));

    const name = (nameMatch?.[1] ?? nextLine.split(/\s+DEV\s*$/)[0] ?? "").trim();
    if (!name) continue;

    cards.push({
      name,
      url: linkInHead[1].split(")")[0],
      date: dateMatch?.[1] ?? "",
      awards: [...new Set(awards)].filter((a) => !/^Site Of The Day$/i.test(a) || true),
    });
  }
  return cards;
}

const stamp = new Date().toISOString().slice(0, 10);
const sections = [];
const seen = new Set();
let total = 0;

for (const [label, url] of Object.entries(PAGES)) {
  process.stdout.write(`fetching ${label} ... `);
  let markdown;
  try {
    markdown = await fetchPage(url);
  } catch (error) {
    console.log(`FAILED (${error.message})`);
    sections.push(`## ${label}\n\nNot fetched on ${stamp}: ${error.message}\n\nSource: ${url}\n`);
    continue;
  }
  const cards = parseCards(markdown);
  console.log(`${cards.length} cards`);
  const rows = [];
  for (const card of cards) {
    if (seen.has(card.url)) continue;
    seen.add(card.url);
    total++;
    const when = card.date || "date not shown";
    const badges = card.awards.length ? card.awards.join(", ") : "listed";
    rows.push(`- **${card.name}** — ${when} — ${badges} — ${card.url}`);
  }
  sections.push(
    `## ${label}\n\nSource: ${url}\nFetched: ${stamp}\n\n${rows.length ? rows.join("\n") : "No entries parsed from this page."}\n`,
  );
}

if (total === 0) {
  console.error("Parsed zero entries across every page. Nothing written.");
  process.exit(1);
}

const body = `# Awwwards winners, fetched ${stamp}

A dated snapshot, not a live feed. Every row was parsed from the public listing pages
named under each section. Names, dates and links are the site's own. No images, scores or
descriptions were copied.

Regenerate with \`node scripts/refresh.mjs\`. If a section says it was not fetched, that
page failed at the time, and the section is left short rather than filled in.

${sections.join("\n")}

## Total

${total} unique entries across ${Object.keys(PAGES).length} listing pages.
`;

const outDir = join(ROOT, "references");
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, `winners-${stamp}.md`);
writeFileSync(outFile, body, "utf8");
console.log(`\nwrote ${outFile} (${total} entries)`);

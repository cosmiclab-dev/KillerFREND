# KillerFREND

A design reference skill for coding agents, built from [Awwwards](https://www.awwwards.com/).

It answers one question well: **what does good web design look like right now, and why?**
It ships the site's own vocabulary, a dated index of what it actually awarded, and a
method for reading a winner instead of copying its surface.

Works with Claude Code, Codex, OpenCode, Cursor, Antigravity, Gemini CLI and anything
else that reads an agent skill.

---

## Install

```bash
npx -y skills add https://github.com/cosmiclab-dev/KillerFREND
```

Or copy the folder into your agent's skill directory:

| Agent | Directory |
| --- | --- |
| Claude Code | `~/.claude/skills/killerfrend` |
| OpenCode | `~/.config/opencode/skills/killerfrend` |
| Codex | `~/.codex/skills/killerfrend` |
| Shared store | `~/.agents/skills/killerfrend` |

Restart the agent afterwards.

---

## Why this exists

Most "make it beautiful" instructions fail for the same reason: the agent has no
reference and no vocabulary, so it reaches for the same three stock layouts.

This skill gives it both. Sector, style and technology tags come from the site itself, so
the agent can say *editorial, horizontal, scroll-driven, for a fashion house* instead of
*modern and clean*. The winner index gives it real work to look at. The study questions
turn looking into a decision.

---

## What's inside

| File | Contents |
| --- | --- |
| `SKILL.md` | The router: which reference to open, the study questions, the rules |
| `references/taxonomy.md` | 27 sectors, 54 style tags, 114 technology tags, 122 countries, the font index |
| `references/patterns.md` | What awarded work shares, how to read a winner, anti-patterns |
| `references/api.md` | The public API, `robots.txt` policy, request etiquette |
| `references/winners-2026-10-22.md` | 217 entries from five listing pages |
| `references/annual-awards-2026-10-22.md` | 190 annual nominees across six categories |
| `scripts/refresh.mjs` | Rebuild the winner index |
| `scripts/refresh-api.mjs` | Rebuild the annual index from the public API |

---

## Use it

**Pick a direction**

> Read `references/taxonomy.md`, choose a sector and two style tags, then open three
> entries from the winner index in that sector and answer the seven study questions.

**Judge a build**

> Read `references/patterns.md`, run the study questions against this page, and tell me
> which section is the weakest and why.

**Pull structured data**

> Use the annual awards API described in `references/api.md` and list every Developer
> Site of the Year nominee with its country and studio.

---

## Refresh the snapshots

```bash
node scripts/refresh.mjs        # listing pages, 5 requests
node scripts/refresh-api.mjs    # annual awards, 190 requests
```

Each run writes a new dated file. Nothing is overwritten, so an old snapshot stays
citable.

`refresh.mjs` reads through [Jina Reader](https://r.jina.ai/) because the site blocks
plain automation. `refresh-api.mjs` uses the public API and needs no proxy.

---

## How it was built

- [webskills](https://github.com/kstonekuan/webskills) was built from source and run
  against the homepage. Its extraction surfaced the `openapi.json`, the API endpoints and
  the robots policy, which changed the approach from scraping HTML to reading the API.
- The npm package `webskills-cli@0.0.1` is broken on Windows: its installer downloads a
  release asset that returns 404. Building from source works.
- Listing pages were fetched through the [agent-reach](https://github.com/Panniantong/Agent-Reach)
  web backend (Jina Reader).
- Taxonomy, country and font lists were parsed from the site navigation on 2026-10-22.

---

## What it does not do

- It is not a copy of Awwwards. No screenshots, scores or descriptions are included.
- The winner index is a sample of five listing pages, not the whole catalogue.
- `patterns.md` is craft judgement, not a statistical finding. It says so at the top.
- It does not generate a site. Use `design-taste-frontend`, `impeccable` and your own
  build stack for that.

---

## Layout

```
KillerFREND/
├── SKILL.md
├── README.md
├── references/
│   ├── api.md
│   ├── annual-awards-2026-10-22.md
│   ├── patterns.md
│   ├── taxonomy.md
│   └── winners-2026-10-22.md
└── scripts/
    ├── refresh-api.mjs
    └── refresh.mjs
```

---

## Data and licence

The snapshots contain names, dates, countries, studios and links published by Awwwards.
That data belongs to Awwwards and to the studios that made the work. It is included as a
dated citation, not as a redistribution of their catalogue.

The skill itself — the text, the study method and the two scripts — is MIT licensed.
See [LICENSE](LICENSE). That licence does not extend to the Awwwards data.

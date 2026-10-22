# KillerFREND

A design reference skill for coding agents.

It answers one question well: **what does good web design look like right now, and why?**
It ships the vocabulary used to describe awarded work, a dated index of what won, and a
method for reading a site instead of copying its surface.

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

This skill gives it both. Sector, style and technology tags let the agent say *editorial,
horizontal, scroll-driven, for a fashion house* instead of *modern and clean*. The index
gives it real work to study. The questions turn looking into a decision.

---

## What's inside

| File | Contents |
| --- | --- |
| `SKILL.md` | The router: which reference to open, the study questions, the rules |
| `references/taxonomy.md` | 27 sectors, 54 style tags, 114 technology tags, 122 countries, typefaces |
| `references/patterns.md` | What awarded work shares, how to read a winner, anti-patterns |
| `references/winners-2026-10-22.md` | 217 entries from five listing pages |
| `references/annual-awards-2026-10-22.md` | 190 nominees across six categories |

---

## Use it

**Pick a direction**

> Read `references/taxonomy.md`, choose a sector and two style tags, then find entries in
> that combination and answer the seven study questions.

**Judge a build**

> Read `references/patterns.md`, run the study questions against this page, and tell me
> which section is the weakest and why.

**Compare against awarded work**

> Use the dated index to find three sites in this sector and tell me what they share that
> this page does not.

---

## What it does not do

- It contains no links, screenshots, scores or descriptions. Entries are names, dates,
  countries and studios only.
- The index is a sample of five listing pages, not a catalogue.
- `patterns.md` is craft judgement, not a statistical finding. It says so at the top.
- It does not generate a site. Use a build skill and your own stack for that.

---

## Layout

```
KillerFREND/
├── SKILL.md
├── README.md
├── LICENSE
└── references/
    ├── annual-awards-2026-10-22.md
    ├── patterns.md
    ├── taxonomy.md
    └── winners-2026-10-22.md
```

---

## Licence

MIT, see [LICENSE](LICENSE).

---
name: killerfrend
description: Design reference built from awwwards.com. Use when choosing a direction for a website or app, when a page looks generic or templated, when comparing a build against award-winning work, when you need a sector, style or technology reference, or when the user asks what good web design looks like right now. Ships a dated winner index, the site's taxonomy, its public API, and a study method.
---

# KillerFREND

A design reference taken from Awwwards: the vocabulary the site uses to describe work,
a dated index of what it actually awarded, and a method for reading a winner instead of
copying its surface.

It is a reference, not a generator. It will not make a site good by itself. It tells you
what to look at, and what the awarded work tends to share.

## Pick the entry point

**You need a direction.** Start with `references/taxonomy.md`. Choose a sector and one or
two style tags, open three entries from `references/winners-2026-10-22.md` in that
sector, and answer the study questions below. Decide the idea before touching layout.

**You are judging something already built.** Read `references/patterns.md`, run the study
questions against the build, and name the weakest section. That is the work.

**You need structured data.** Read `references/api.md`. The annual awards have a public
API with 190 nominees. Daily winners do not, so use the dated snapshot and refresh only
when freshness matters.

**The user is asking for "award-winning" and has no brief.** Do not start with visuals.
Ask what the site is for, then pick a sector from the taxonomy. Award-winning work is
specific; a brief that says "make it premium" has not told you anything yet.

## Study questions

Answer these in order, in writing, for any site you use as a reference:

1. The spine: the one idea the whole site serves, in a sentence.
2. The promise: what the first screen promises, and whether the rest keeps it.
3. The type: which face does the work, at what size and tracking.
4. The grid: where it breaks, and why there.
5. The motion budget: how many transitions, which is the signature, what it explains.
6. The cost: what it took to build. CSS, video, WebGL, or a heavy library.
7. The weakest section.

`references/patterns.md` explains each one and what to do with the answer.

## Rules

- **Steal the move, not the surface.** A horizontal section that slows a reader is a
  move. A clone of someone's colour palette is a surface.
- **One idea per build.** If you cannot state the spine in a sentence, the design is not
  ready to be styled.
- **Cost is a design decision.** Say what the motion and media will cost before adding
  them.
- **Never claim a site inspired a decision you did not make.** Cite the entry you used.
- **Keep provenance.** The index is dated. If it is older than the work, say so.

## Related skills, when installed

- `design-taste-frontend` for direction, `impeccable` for polish.
- `antislop-ui` and `antislop-human` for contrast, focus and tap targets.
- `jury` for scoring a site against a jury standard.
- `awwwards` for the implementation references (layout, type, motion, WebGL, Next.js).

Do not load all of them. Pick the one that owns the current decision.

## Files

| File | What it holds |
| --- | --- |
| `references/taxonomy.md` | sectors, style tags, technology tags, countries, fonts |
| `references/patterns.md` | what awarded work shares, and how to read it |
| `references/api.md` | the public API, robots policy, etiquette |
| `references/winners-2026-10-22.md` | 217 dated entries from five listing pages |
| `references/annual-awards-2026-10-22.md` | 190 annual nominees across six categories |
| `scripts/refresh.mjs` | rebuild the winner index |
| `scripts/refresh-api.mjs` | rebuild the annual index from the API |

## Refreshing

```bash
node scripts/refresh.mjs        # listing pages, 5 requests
node scripts/refresh-api.mjs    # annual awards, 190 requests
```

Both write a new dated file instead of overwriting the old one. That is deliberate: a
snapshot you can date is evidence, a file that silently changes is not.

## Limits

- The winner index is a sample of five listing pages, not the whole catalogue.
- The annual index is a complete set of current nominees, not of all history.
- Descriptions, scores and images are not included. They belong to the site and the
  studios that made the work.
- `patterns.md` is craft judgement, not statistics. It says so at the top.

# Patterns

This is craft judgement, not a measurement of the 217-site snapshot. The snapshot is a
list of names and links; it does not tell you why a jury liked a site. What follows is
what awarded work tends to share when you open it and look.

Treat it as a checklist for reading, and as a set of levers for building. Do not treat it
as a formula. A site that copies every lever below without a reason of its own is still a
template.

## What awarded work tends to have

**One spine.** There is a single idea the whole site serves, and every section advances
it. The idea is usually concrete: a place, a material, a mechanism, a voice. Sites that
merely have "nice sections" do not survive a second look.

**A first screen that states the idea.** Not a hero image with a generic headline. The
first viewport tells you what this is, who it is for, and what it feels like. Nothing
important is below the fold that the first screen failed to promise.

**Committed typography.** Usually one display face carrying personality and one text face
carrying reading. The display face is set large, with tight tracking and deliberate line
breaks. Type does the compositional work that stock photography would otherwise do.

**Restraint in colour.** Two or three colours plus neutrals, used consistently, with
contrast that survives a bad screen. Colour is applied to structure, not sprinkled over it.

**Motion that explains.** A transition exists to show where something came from or where
it went. Scroll is used to drive a narrative, not to hijack the wheel. Motion respects
`prefers-reduced-motion` and never blocks the content.

**A physical detail.** Images with texture, grain, a real material, a real object, a real
place. It is the cheapest way to look like a specific site rather than a generic one.

**Craft under the surface.** Fast first paint, images that do not jump the layout, working
focus states, real form validation, no console noise. Jurors and developers notice, and
the Developer Award exists for exactly this.

## How to read a winner

Open the site, then answer these in order. Write the answers down; the value is in the
comparison, not in the browsing.

1. **The spine.** What is the one idea? Say it in a sentence without using the word
   "modern".
2. **The promise.** What does the first screen promise, and does the rest keep it?
3. **The type.** Which face is doing the work, at what size, with what tracking? Is the
   body face the same family or a deliberate contrast?
4. **The grid.** Where does it break its own grid, and why there?
5. **The motion budget.** How many distinct transitions are there? Which one is the
   signature, and what does it explain?
6. **The cost.** What did this take: WebGL, a video, a shader, a heavy scroll library, or
   nothing but good CSS? Cost is a design decision, not an implementation detail.
7. **The weakest section.** Every awarded site has one. Find it. That is where the
   lesson is.

## Levers worth stealing, in the honest sense

Steal the *move*, not the surface.

- A horizontal section inside a vertical page, used once, to slow the reader down.
- A single oversized word that acts as a section divider instead of a heading.
- One image that runs full-bleed and breaks the container, against a strict grid.
- A cursor or hover state that reveals information instead of decorating.
- A page transition that carries the same element across routes.
- A footer that ends the idea rather than repeating the nav.

## Anti-patterns that awarded work avoids

- A hero carousel with three unconnected messages.
- Scroll-jacking with no way out.
- Motion on every element, so nothing reads as important.
- Body text below 16px at desktop widths, or measure beyond 75 characters.
- Text over imagery without a scrim that actually passes contrast.
- Placeholder content, lorem ipsum, or stock faces in a portfolio.
- A "creative" navigation that hides the only three pages the site has.
- Autoplaying audio.

## Using this with the rest of the library

- Direction before polish: `design-taste-frontend` chooses the idea, then `impeccable`
  fixes hierarchy and states.
- Hard rules on contrast, focus and tap targets: `antislop-ui` and `antislop-human`.
- Scoring a site against a jury standard: `jury`.
- Building the thing: a build-oriented design skill in this library, if installed, holds
  the implementation references (layout, type, motion, WebGL, Next.js, Astro).

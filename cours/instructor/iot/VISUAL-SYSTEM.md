# IoT Systems Design — Visual System

## Direction: Technical Atlas / Systems Design Review

The course should feel deliberately designed, but not like a generic product dashboard. Its visual identity comes from **information design**: editorial grids, technical diagrams, strong numbering, precise alignment and a restrained instrumentation vocabulary.

This file defines the reusable visual rules for Student, Projector and Instructor Notes.

## 1. One visual language on every surface

Student, Projector and Instructor Notes use the same visual grammar:

- warm paper background rather than pure white;
- near-black ink for primary structure;
- one signal blue for interaction, navigation and technical emphasis;
- amber/red/green only when their semantic meaning is useful;
- sans-serif for explanations and questions;
- monospace for metadata, timings, standards, state, counters and technical annotations;
- grid lines, rules, arrows and labels as visual structure.

The surfaces may differ in density, but not in identity.

## 2. Hierarchy before containers

Use, in this order:

1. typography;
2. whitespace;
3. alignment and grid;
4. rules / borders;
5. background contrast;
6. containers only when a component genuinely needs a boundary.

Do not turn every sentence or concept into an independent card.

## 3. Geometry

Default corners are square or nearly square (`0–4px`).

Rounded geometry is reserved for things that are intrinsically circular or node-like, for example:

- physical sensor points;
- radio/network nodes when the diagram meaning benefits from it;
- a central unresolved `?` or other explicit conceptual node.

Do not use large rounded rectangles as the default layout primitive.

## 4. Shadows

Avoid soft floating shadows on ordinary content surfaces.

A small hard offset shadow may be used deliberately for movable or discrete diagram objects, such as architecture nodes, because it helps them read as manipulable objects.

## 5. Color

Core palette:

- Paper: `#F2F0E8`
- Surface: `#FBFAF5`
- Ink: `#13191F`
- Signal blue: `#1555D9`
- Muted rule: `#C8C6BD`

Semantic colors:

- Challenge / caution: amber
- Failure / stress: red
- Confirmed / completed: green

Do not assign a decorative rainbow color to each activity. Activity identity is primarily carried by **number + title + position in the course skeleton**.

## 6. Typography

### Sans-serif
Use for:

- learning questions;
- explanations;
- activity titles;
- student content;
- discussion prompts.

### Monospace
Use sparingly for:

- `ACTIVITY 03 OF 07`;
- `WORK TARGET · 6–8 MIN`;
- standard names / measurements when used as data;
- small diagram annotations;
- state labels and counters;
- technical captions.

The contrast between explanatory sans-serif and technical mono is part of the identity.

## 7. Diagrams are first-class layout elements

Whenever the learning object is a structure, the structure itself should carry the visual composition.

Examples:

- campus mission → site plan;
- architecture → graph / labelled flows;
- requirements → structured matrix or tally;
- technology families → network-shape strip;
- design revision → v1 → changed assumption → v2.

Do not put a diagram inside a decorative card merely because a card component exists.

## 8. Projector-specific rule

The Projector is a **design-review surface**, not a slide deck.

A WORK screen should normally contain:

- activity identifier;
- one large central question;
- concise task / output / defence criteria;
- timing annotation.

A RESTITUTION screen should normally contain:

- the appropriate collective representation;
- 2–3 discussion prompts;
- one counterexample;
- in-place What-to-keep / Reality reveals.

The class representation should be visually dominant.

## 9. Interactive components

Interactive controls remain visibly interactive, but use the same technical grammar:

- compact rectangular buttons;
- clear border / selected-state changes;
- no decorative pill unless the item is genuinely a status/tag;
- keyboard focus remains highly visible;
- state must never rely on color alone.

## 10. Anti-patterns

Avoid combining several of the following on one screen:

- large-radius cards;
- pastel card backgrounds for every concept;
- gradient panels;
- soft floating shadows;
- decorative pills;
- a different accent color for every activity;
- repeated card-with-icon-card-with-caption compositions.

The problem is not visual richness. The goal is **specific visual richness**: diagrams, typography, grid, annotation and composition rather than generic dashboard decoration.

## 11. Authoring invariant

New sessions should reuse the visual tokens and component grammar before inventing new visual primitives. A new component is justified when the learning representation requires it, not merely to make the page look different.

## 12. Text labels are tabs, not fixed icon boxes

Fixed square markers are reserved for genuinely short symbolic content such as `01`, `02`, `A`, or `B`.

Textual micro-labels such as `COMPARE`, `EVIDENCE`, `BOUNDARY`, or `RESIDUAL RISK` must use **auto-width technical tabs**. Their background expands to contain the full label; the text must never overflow a fixed square.

If horizontal space becomes constrained, stack the tab above its explanatory text rather than shrinking or clipping the label.

## Restitution reading order

A restitution screen must expose a clear vertical hierarchy:

1. **Artifact / class representation** — the main visual surface, full width.
2. **Compare, then discuss** — when a restitution starts by comparing class artefacts, show that comparison prompt as a static strip below the board. Only questions that benefit from an explicit teaching anchor become flippable cards: the question stays visible first; the back reveals the local KEEP anchor.
3. **Reality check** — optional, below the deck, used only to ground or transfer the result.

Do not add a second `What to keep` panel on the Projector. A static compare prompt has no hidden answer; the optional flippable cards carry only the local takeaways that genuinely need formalisation. The public reading order is **artifact → compare → discuss/test → optional KEEP → reality check**.

## Conclusion focus on Projector

Rich `REALITY CHECK` plates must remain readable without turning the Projector into a scrolling document. When the Reality Check opens, the top restitution context may enter a compact **conclusion focus** state so the external evidence remains legible. KEEP cards must never be clipped or treated as a second hidden reference plate.


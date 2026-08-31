# IoT Systems Design — Session 1

Static GitHub Pages site for an interactive first IoT systems-design session.

## Pages

- `index.html` — entry page
- `student.html` — student activity workspace
- `teacher.html` — concise teacher guide in English

## Design principles

- No backend, account, database, or live classroom service.
- Student state is stored in `localStorage` on the current browser/device.
- Export/import uses a JSON session file.
- Only the current activity is displayed; students advance manually after teacher discussion stops.
- Every STOP screen automatically reproduces the group output needed for discussion.
- Desktop architecture uses a draggable canvas; mobile automatically renders the same components and flows as a graph.
- Free-text input is deliberately limited. Later activities use mapping, selection, prioritisation, guessing, scenario decisions and stress tests.
- Every core activity includes an optional `Done early?` challenge. These extensions deepen the same concept without blocking the class progression.
- Technology cards expose optional deeper technical content, side-by-side comparisons and official reference links.

## Session flow

1. Map deliberately cross-domain IoT use cases.
2. Build architecture v1 from a blank canvas.
3. Expose and prioritise communication requirements.
4. Infer technologies from progressively revealed clues.
5. Inspect the network architecture behind each technology.
6. Commit technology decisions under explicit assumptions.
7. Stress-test the original architecture.

## V6 additions

- Opening cases are no longer obvious one-domain examples; each asks for a main domain and at most one secondary domain.
- STOP screens act as discussion snapshots: the group's map, architecture, requirements or technology decisions remain visible.
- Optional challenge modes exist at all seven stages: IoT boundary cases, component-removal analysis, per-flow requirements, abstraction-layer traps, side-by-side technology comparison + NTN lens, missing-information cases, and compound failures.
- Technology deep dives include Bluetooth LE PHY trade-offs, IEEE 802.15.4 abstraction level, LoRa vs LoRaWAN, LoRaWAN device classes/ADR/regional parameters, NB-IoT vs LTE-M and 3GPP NTN.

## GitHub Pages

The site uses only relative internal paths, so it can be hosted at the repository root or in any subdirectory. To serve it from `cours/iot/`, copy the site files into `<Pages publishing source>/cours/iot/`. No build step is required.

See `SOURCES.md` for technical references and image attribution.


## V6 polish
- Optional Expert trail (0/7), not graded.
- Confidence calibration in Technology Detective.
- Decisive-assumption selection before deployment-case feedback.
- Claim Lab with True / False / Depends statements for abstraction-level misconceptions and conditional engineering claims.
- One-move architecture red-team and one-change compound-failure challenge.
- Richer STOP discussion signals and wording polish.


## Final review

- Storyline locked: landscape → architecture → requirements → infer → inspect → decide → break.
- Claim Lab deliberately mixes True / False / Depends to avoid answer-pattern gaming.
- Deployment-case “decisive assumption” feedback is framed as a reference interpretation, not a uniquely correct justification.
- All internal links and assets are relative, and the hero visual is self-contained, so nested GitHub Pages deployment such as `cours/iot/` is supported without runtime image dependencies.

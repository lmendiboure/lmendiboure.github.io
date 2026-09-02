# IoT Systems Design — Session 1

Student-facing interactive mission using the reusable MACU learning-design pattern.

## Public student URL

This session is published under the course hub:

`/cours/iot/session-1/`

Students should normally receive only the course URL:

`/cours/iot/`

The course hub then routes them to the mission currently open.

- `index.html` — Session 1 student workspace
- `student.html` — compatibility redirect to `./`
- `assets/styles.css` — Session 1 styles
- `assets/student.js` — local-only interactive logic
- `SOURCES.md` — technical source notes

The teacher guide is stored at `/cours/instructor/iot/session-1/` and is not linked from the student course hub. It is still public if the GitHub Pages path is known.

The student site uses no backend or database. Work is saved in browser `localStorage` and can be exported/imported as JSON.

## Pedagogical flow

1. map the IoT landscape without being told the conclusion;
2. enter a persistent campus mission brief, then build an architecture from functions and information flows;
3. close the loop by adding actuation, command, authority and physical-state feedback;
4. rank communication constraints at system level, then challenge that ranking on one real Architecture v1 flow before the STOP;
5. discover network shapes by predicting their structural dependency before revealing technology names;
6. consolidate the technology map with the detective and guided reference cards;
7. choose technologies under explicit assumptions, complete transfer cases, then return to the campus mission;
8. stress-test the frozen architecture v1 by tracing incident → challenged assumption → affected responsibility/flow → requirement, make a concrete architecture v2 delta, defend residual risk at a dedicated STOP, then finish with retrieval before synthesis.

At collective restitutions, students first compare what they produced. The instructor then opens **WHAT TO KEEP** to institutionalise a compact canonical reference map and, when useful, **REALITY CHECK** to ground it with an architecture, standard, worked example or technical order of magnitude. These are in-place conclusion panels, not extra navigation screens.

## Navigation model

The session uses **soft linearity**:

- future stages remain locked until reached normally;
- every already-unlocked stage can be revisited from the progression bar;
- review mode is explicit and provides a one-click return to the current mission;
- meaningful commitments are preserved rather than silently rewritten;
- Architecture v1 becomes read-only after STOP 2 and later structural change is recorded as Architecture v2.

## Running case

This session is part of one continuous campus engineering case. Stakeholder interventions introduce only decision-relevant information: service needs, field constraints, architecture claims, integration problems or incidents. The narrative is therefore functional rather than decorative.

**Trigger / dossier / task separation:** the stakeholder intervention introduces the change or decision tension; the dossier/state block carries factual evidence; the activity prompt states the student task. These three surfaces must not restate the same information.


## Mission dossier across sessions

The student workspace keeps pedagogical progress (screens, unlocks, retrieval, hints) inside the session state, but publishes only a small structured **Mission dossier** across sessions. Session 1 records the classified Architecture v2 pattern, Top-3 communication requirements, campus access stance, key open uncertainty, and the incident that triggered revision. Session 2 reads those fields when available and otherwise uses a generic fallback. Free-text answers are never interpreted to drive the next session. The export file contains the Mission dossier plus the current session progress so it can also be moved to another browser.

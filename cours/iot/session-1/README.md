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
3. move from monitoring to control through one progressive claim trace: what an acknowledgement proves, what evidence is needed for physical effect, and where override authority sits;
4. rank communication constraints at system level, then challenge that ranking on one real defended-baseline flow before the STOP;
5. compare five network shapes side by side using distance, traffic, device budget and infrastructure, then defend one leading campus hypothesis, one challenger and the missing fact most likely to reverse the ranking;
6. audit the architectural scope hidden behind technology names, using the Activity 5 hypothesis/challenger plus one contrast; the full five-family map remains available as reference;
7. choose technologies under explicit assumptions, sample transfer cases as useful practice, then return to the campus mission without a form-completion gate;
8. stress-test the frozen design baseline by tracing incident → challenged assumption → affected architectural scope → requirement → one explicit justified design change, defend its residual dependency at a dedicated STOP, then finish with retrieval before synthesis. NTN is introduced only when the incident removes terrestrial coverage, where direct satellite access and satellite backhaul become distinct design choices.

At collective restitutions, students first compare what they produced. The instructor then opens **WHAT TO KEEP** to institutionalise a compact canonical reference map and, when useful, **REALITY CHECK** to ground it with an architecture, standard, worked example or technical order of magnitude. These are in-place conclusion panels, not extra navigation screens.

## Navigation model

The session uses **soft linearity**:

- future stages remain locked until reached normally;
- every already-unlocked stage can be revisited from the progression bar;
- review mode is explicit and provides a one-click return to the current mission;
- meaningful commitments are preserved rather than silently rewritten;
- The defended design baseline becomes read-only after STOP 2; later evidence is recorded as an explicit causal revision while the baseline remains visible as evidence.

## Running case

This session is part of one continuous campus engineering case. Stakeholder interventions introduce only decision-relevant information: service needs, field constraints, architecture claims, integration problems or incidents. The narrative is therefore functional rather than decorative.

**Trigger / dossier / task separation:** the stakeholder intervention introduces the change or decision tension; the dossier/state block carries factual evidence; the activity prompt states the student task. These three surfaces must not restate the same information.


## Mission dossier across sessions

The student workspace keeps pedagogical progress (screens, unlocks, retrieval, hints) inside the session state, but publishes only a small structured **Mission dossier** across sessions. Session 1 records the classified current defended architecture pattern, Top-3 communication requirements, campus access stance, key open uncertainty, and the incident that triggered revision. Session 2 reads those fields when available and otherwise uses a generic fallback. Free-text answers are never interpreted to drive the next session. The export file contains the Mission dossier plus the current session progress so it can also be moved to another browser.

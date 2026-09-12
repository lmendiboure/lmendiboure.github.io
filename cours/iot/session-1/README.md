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

1. test a useful IoT boundary across contrasting physical systems;
2. build a defended campus baseline from responsibilities, labelled flows and one explicit open assumption;
3. move from monitoring to control by separating command acknowledgement, physical-state evidence and operator authority;
4. derive communication requirements at system level and for one concrete flow;
5. **two-step technology activity:** compare network shapes without technology names, then reveal candidate families and audit the infrastructure / abstraction commitments hidden behind those names;
6. test one technology fit under a counterfactual, return to campus, and defend a one-family / mixed / insufficient-evidence stance together with the missing fact that could reverse it.

The former Session-1 stress-test/revision activity has moved to **Session 4 — Robustness**, where failures, retries, degraded behaviour, connectivity loss and architecture revision form one coherent arc.

### Returning after a split class

Session 1 is deliberately resumable. The activity bar is always open; unfinished earlier work never blocks a direct jump to a later activity. For a class resuming at the technology comparison, open `?activity=5`. Activity 5 begins with a compact reconstruction of the reasoning chain from the previous class.

## Navigation model

Session 1 uses **resumable navigation**:

- all six canonical activity entries are always reachable from the activity bar;
- local completion gates still help students finish the current interaction, but they never prevent a teacher-led class from resuming at a later activity;
- `?activity=N` opens a specific activity directly;
- meaningful commitments are still saved locally and can be revisited;
- the defended design baseline remains evidence rather than being silently rewritten later.

## Running case

This session is part of one continuous campus engineering case. Stakeholder interventions introduce only decision-relevant information: service needs, field constraints, architecture claims, integration problems or incidents. The narrative is therefore functional rather than decorative.

**Trigger / dossier / task separation:** the stakeholder intervention introduces the change or decision tension; the dossier/state block carries factual evidence; the activity prompt states the student task. These three surfaces must not restate the same information.


## Mission dossier across sessions

The student workspace keeps pedagogical progress (screens, unlocks, retrieval, hints) inside the session state, but publishes only a small structured **Mission dossier** across sessions. Session 1 records the classified communication-path pattern, Top-3 communication requirements, campus access stance and key open uncertainty. Session 2 reads those fields when available and otherwise uses a generic fallback. Free-text answers are never interpreted to drive the next session. The export file contains the Mission dossier plus the current session progress so it can also be moved to another browser.

# Session 1 instructor surfaces

- `index.html` — **Projector Mode**, safe to screen-share.
- `notes.html` — **Instructor-facing facilitation notes** with accepted answers, misconceptions, technical precision, fallback prompts and transitions.

## Structural invariant

Student, Projector and Notes use exactly the same eight canonical activities:

1. Map the IoT landscape
2. Build a defensible baseline design
3. From monitoring to control
4. Expose communication requirements
5. Discover network shapes
6. Audit technology scope
7. Choose under constraints
8. Stress-test and revise

The Projector gives every activity one WORK screen. Activities 1, 2, 3, 4, 7 and 8 also have one RESTITUTION screen; Activities 5 and 6 are intentionally WORK-only. A missing restitution never changes numbering or merges activities.

## Projector controls

- Right arrow / Space: advance to RESTITUTION when the current activity has one; otherwise advance directly to the next activity WORK screen.
- Left arrow: go back one public screen.
- `F`: fullscreen.
- Eight progress markers show position only; navigation stays on Back / Next.

**WORK** shows one question, short context and the expected student artefact. **RESTITUTION** shows one discussion question, then one full-width card that is flipped after students reveal their own takeaway; the Projector card contains only essential complementary points. All additional facilitation depth stays in `notes.html`.

The instructor-facing sequence **LOOK → COMPARE → CHALLENGE → FORMALISE → GROUND** lives in `notes.html`, not in projector navigation. Do not project `notes.html`.

## Pacing

Two pacing modes are explicit in `notes.html`: a strict **90-minute Core run** (10 / 14 / 12 / 11 / 5 / 7 / 16 / 15 min) and the existing **101–122 minute full-depth envelope**. The Core run preserves all six restitutions and timeboxes work/discussion; it does not delete conceptual steps.

## Reusing Session 1

The Projector no longer stores class-entered board state. Reloading the page starts a clean run at Activity 1; there is no separate class-board reset workflow.


## Running operational case

Sessions 1 and 2 use the **same campus environmental system** and the same four stakeholder voices:

- **Amina — Campus operations lead:** service outcomes and operating constraints.
- **Sam — Field technician:** physical devices, deployment evidence and incidents.
- **Yanis — Network architect:** connectivity, infrastructure and protocol responsibilities.
- **Leila — Platform engineer:** applications, data and interoperability.

A stakeholder intervention is never decorative. It must introduce a fact, need, claim or incident that changes the engineering question. The student loop is:

**operational trigger → decision/artifact → class discussion → formalisation → transfer**

Use the same student-facing reading order everywhere: **STARTING POINT → NEW INPUT → DESIGN IMPACT → YOUR MOVE**. The starting point recalls only the minimum prior state; the stakeholder contributes one new fact, need, contradiction or incident; design impact states what has become unresolved without solving it; the activity alone owns the instruction. Do not add a second case-state block that repeats the same information, and do not improvise biography or narrative detail that does not alter the technical reasoning.


## Mission dossier across sessions

The student workspace keeps pedagogical progress (screens, unlocks, retrieval, hints) inside the session state, but publishes only a small structured **Mission dossier** across sessions. Session 1 records the classified current defended design pattern, Top-3 communication requirements, campus access stance, key open uncertainty, and the incident that triggered revision. Session 2 reads those fields when available and otherwise uses a generic fallback. Free-text answers are never interpreted to drive the next session. The export file contains the Mission dossier plus the current session progress so it can also be moved to another browser.


## Publication boundary

`notes.html` is **instructor-facing, not access-controlled**. If `cours/instructor/` is deployed on public GitHub Pages, anyone who knows the path can open it. The Projector is designed to be student-safe; keep the instructor tree local/private if facilitation answers must genuinely remain unavailable.

## Projector grammar (v1.42)

Both sessions use the same deliberately minimal public sequence: **WORK → DISCUSS → FLIP ONCE → NEXT**. WORK shows one question, short context and the expected artefact. A RESTITUTION shows one discussion question and one full-width card; the card back contains at most 2–3 essential complementary points that are not already on the student takeaway. Follow-up prompts, references, metrics, counterexamples and optional depth stay in `notes.html`, not on the Projector.


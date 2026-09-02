# IoT Systems Design — Session 2

**Mission:** How do things communicate?

Canonical nine-activity skeleton shared by Student / Projector / Instructor Notes:

1. Describe the conversations
2. Draw a message choreography
3. Build the stack by responsibility
4. Discover network and transport pieces
5. Discover application exchange protocols
6. Make the exchange interoperable
7. Compose complete stacks
8. Choose the delivery semantics
9. Stress-test the exchange

Core reasoning loop:

**service need → interaction pattern → choreography → message meaning → stack responsibilities → protocol composition → delivery semantics → failure test**

Design principle: students reason about roles, scopes and interaction patterns before protocol names are treated as design answers.

## Restitution contract

Projector restitutions are used for Activities 1, 2, 3, 6, 7, 8 and 9. The Student surface now exposes the same seven STOPs, including Activity 9.

Use the stable rhythm:

**LOOK → COMPARE → CHALLENGE → FORMALISE → GROUND**

- **LOOK**: keep the group's own artifact visible.
- **COMPARE**: expose differences in reasoning, not only different final answers.
- **CHALLENGE**: reveal the counterexample after groups have committed.
- **FORMALISE**: open **What to keep** on the Projector and have students unlock the corresponding formal concept.
- **GROUND**: use **Reality check** for a concrete standard, architecture, mechanism or technical fact.

The Student **Field guide** stores the compressed reference version after each discussion. It is deliberately less verbose than the Projector Reference Plate but covers the same conceptual map.

Activities 4 and 5 remain WORK-only so protocol discovery is not interrupted by premature whole-class correction. Their concrete names are consolidated in the Activity 7 composition restitution.

The Student Core route is sufficient on its own. Four optional **Challenge me** routes are available at Activities 3, 6, 7 and 8; use them for groups ready for less scaffolding, not simply for groups that finish quickly.

## Final retrieval

Do not use the final screen as a lecture summary. After the Activity 9 restitution, students enter a six-question Memory Lock. They answer before revealing. The synthesis remains hidden until all prompts have been retrieved.

## Duration

Two pacing modes are explicit in `notes.html`: a strict **90-minute Core run** (9 / 10 / 10 / 6 / 7 / 12 / 14 / 14 / 8 min) and the existing **117–136 minute full-depth envelope**. The Core run preserves all seven restitutions and timeboxes work/discussion; optional Challenge routes belong to the full-depth run. Activity count remains curriculum-driven: the dedicated delivery-semantics activity prevents the final stress-test from introducing reliability, retries, duplicate effects and offline persistence for the first time.

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

The student workspace keeps pedagogical progress (screens, unlocks, retrieval, hints) inside the session state, but publishes only a small structured **Mission dossier** across sessions. Session 1 records the classified Architecture v2 pattern, Top-3 communication requirements, campus access stance, key open uncertainty, and the incident that triggered revision. Session 2 reads those fields when available and otherwise uses a generic fallback. Free-text answers are never interpreted to drive the next session. The export file contains the Mission dossier plus the current session progress so it can also be moved to another browser.


## Publication boundary

`notes.html` is **instructor-facing, not access-controlled**. If `cours/instructor/` is deployed on public GitHub Pages, anyone who knows the path can open it. The Projector is designed to be student-safe; keep the instructor tree local/private if facilitation answers must genuinely remain unavailable.

## Protocol evidence block

Activities 4 and 5 intentionally have no full restitution. Treat them as one evidence-acquisition block with embedded audits. Do not leak IPv6/6LoWPAN/TCP/UDP/Thread placement during the Activity 3 STOP. If needed, run a 60–90 s boundary calibration after an audit; the full technical institutionalisation happens at the Activity 7 composition restitution.

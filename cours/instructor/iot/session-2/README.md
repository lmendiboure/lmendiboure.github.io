# IoT Systems Design — Session 2

**Mission:** How do things communicate?

Canonical nine-activity skeleton shared by Student / Projector / Instructor Notes:

1. What kind of conversation is this?
2. Who speaks, and in what order?
3. Five jobs hidden inside communication
4. Attach technical names to the jobs
5. Three ways applications can exchange information
6. The bytes arrived — why is the data unusable?
7. Build the whole path end to end
8. “Reliable” what, exactly?
9. Explain one failure from end to end

Core reasoning loop:

**concrete service behaviour → ordered exchange → communication jobs → technical names → application exchange → shared meaning → full path → scoped guarantee → failure trace**

Design principle: students reason about roles, scopes and interaction patterns before protocol names are treated as design answers.

## Restitution contract

Projector restitutions are used for Activities 1, 2, 3, 6, 7, 8 and 9. The Student surface now exposes the same seven STOPs, including Activity 9.

Use the stable rhythm:

**LOOK → COMPARE → CHALLENGE → FORMALISE → GROUND**

- **LOOK**: keep the group's own artifact visible.
- **COMPARE**: expose differences in reasoning, not only different final answers.
- **CHALLENGE**: reveal the counterexample after groups have committed.
- **FORMALISE**: use a static compare prompt when the goal is only to inspect differences between groups. Flip a Projector card only when the question benefits from an explicit local **KEEP** anchor; then have students unlock the corresponding formal concept on their Student surface.
- **GROUND**: use **Reality check** for a concrete standard, architecture, mechanism or technical fact.

The Student **Field guide** stores the compressed reference version after each discussion. It is deliberately less verbose than the Projector Reference Plate but covers the same conceptual map.

Activities 4 and 5 remain WORK-only so the flow is not interrupted by a premature vocabulary lecture. The engineering need comes first, the technical name second, and the complete map is consolidated during Activity 7.

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

Activities 4 and 5 intentionally have no full restitution. Treat them as a problem-first naming block. During Activity 3, stabilise only the five engineering jobs; do not require prior knowledge of IPv6/6LoWPAN/TCP/UDP/Thread. In Activity 4, each unfamiliar name is revealed only after its engineering clue has been interpreted. The full technical map is consolidated at Activity 7.

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

Session 2 is intentionally longer than Session 1. Activity count is determined by conceptual work, not symmetry across sessions. The dedicated delivery-semantics activity prevents the final stress-test from having to introduce reliability, retries, duplicate effects and offline persistence for the first time.

## Running operational case

Sessions 1 and 2 use the **same campus environmental system** and the same four stakeholder voices:

- **Amina — Campus operations lead:** service outcomes and operating constraints.
- **Sam — Field technician:** physical devices, deployment evidence and incidents.
- **Yanis — Network architect:** connectivity, infrastructure and protocol responsibilities.
- **Leila — Platform engineer:** applications, data and interoperability.

A stakeholder intervention is never decorative. It must introduce a fact, need, claim or incident that changes the engineering question. The student loop is:

**operational trigger → decision/artifact → class discussion → formalisation → transfer**

Do not let a stakeholder speech duplicate the case dossier or the activity instructions. The speech should trigger or reopen a decision; facts belong in the dossier/state block; the task belongs in the activity prompt. Do not improvise biographies or narrative detail that does not alter the technical reasoning. Session 1 builds and revises architecture; Session 2 continues the same case and makes its exchanges explicit, interoperable and robust.

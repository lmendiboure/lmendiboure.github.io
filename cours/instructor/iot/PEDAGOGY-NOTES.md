# IoT Systems Design — Session 1 pedagogy notes (V10)

This session is the reference implementation of the **Mission–Artifact–Challenge–Unlock (MACU)** pattern documented in `LEARNING-DESIGN-PATTERN.md`.

## Cross-surface coherence rule

Treat the numbered activity sequence as a stable cognitive map for both learners and instructor. Student, Projector and Notes use the same activity identities. Instructor-only facilitation detail is layered onto that map rather than replacing it with teacher-specific blocks. This reduces orientation cost during live teaching and prevents a student “Activity 5” from corresponding to a differently named instructor checkpoint.

## Running-case integration rule

For each activity, keep three roles distinct:

1. **Stakeholder trigger** — introduces a change, contradiction, incident or decision pressure.
2. **Case dossier / system state** — contains the factual evidence students may use.
3. **Student task** — states the engineering work to perform.

If two of these simply repeat each other, merge or rewrite them. The narrative is useful only when it changes the reasoning state of the problem.

## Session-specific learning story

1. **IoT boundary** — students compare contrasting physical systems and formalise a useful working definition of IoT.
2. **Campus baseline** — they translate service facts into responsibilities, components and labelled information flows while keeping one uncertainty explicit.
3. **Monitoring → control** — they separate command, acknowledgement, physical-state evidence and human authority.
4. **Per-flow requirements** — they make range, traffic, latency, energy, infrastructure and related constraints explicit before choosing technology.
5. **Technology comparison** — they compare Wi-Fi, Bluetooth LE, IEEE 802.15.4, LoRaWAN and cellular IoT using the same deployment criteria, then apply the comparison to concrete cases.
6. **Return to campus** — they state a defensible one-family / mixed / insufficient-evidence position and name the missing deployment fact that could still change it.
7. **Memory Lock / synthesis** — retrieval and the final visual model consolidate the reasoning chain before Session 2.

## STOP ritual used throughout

Every classroom STOP follows:

**LOOK → COMPARE → CHALLENGE → UNLOCK**

- LOOK: the student page automatically reproduces the group artifact.
- COMPARE: one question is used to expose alternative reasoning.
- CHALLENGE: a counterexample is revealed on teacher instruction.
- UNLOCK: the formal concept is shown and added to the persistent Field Guide. This consolidates the learning but does not act as a global navigation lock.

## Concepts added to the Field Guide

1. **Working view of IoT** — physical entities observed/acted upon, connected to digital services through communication/computation.
2. **Architecture lens** — Sense/Act · Communicate · Compute · Store · Use are responsibilities, not mandatory boxes.
3. **Engineering vocabulary** — Range, data volume/throughput, latency, reliability, energy, scale, mobility, infrastructure, cost.
4. **Technology decision rule** — compare deployment facts consistently, then treat the chosen communication family as an architecture/infrastructure commitment rather than a radio name alone.

## Why the defended baseline is preserved

After STOP 2, the defended baseline is stored separately. Later communication decisions are added to that artifact rather than silently replacing it. Robustness-driven structural revision has been moved to Session 4, where changed assumptions, failures and redesign can be treated as one coherent topic.

The Session 1 learning claim is therefore visible as:

**service → responsibilities/flows → per-flow requirements → technology comparison → conditional campus choice**.

## Research basis

See `LEARNING-DESIGN-PATTERN.md` for the evidence synthesis and reusable authoring checklist.

## Navigation rule added in V10.1

The session separates **saved learning progress** from the **screen currently viewed**. Canonical activities remain directly reachable so a class can resume or review without being blocked. Formal reference content is still disclosed at the appropriate point rather than pre-revealed. Historically meaningful commitments remain visible as evidence rather than being silently overwritten.

This is intentionally **structured learner control**, not unrestricted hypermedia navigation. Reviews of learner control report mixed or near-zero average effects and warn that additional navigation choices can increase metacognitive/cognitive demands, especially when learners lack prior knowledge. The design therefore gives students review freedom but not freedom to expose future concepts or silently rewrite committed artifacts.

Relevant sources: Scheiter & Gerjets (2007), *Educational Psychology Review*; Karich, Burns & Maki (2014), *Review of Educational Research*.


## Adaptive depth in Session 1

Session 1 keeps two visible optional `Challenge me` routes: architecture and per-flow requirements. Each route begins as an open problem and offers progressively revealed support. These routes deepen the same objective without changing the common class sequence.

This implementation is motivated by the expertise-reversal literature, particularly Tetzlaff & Simonsmeier (2025), which reports that lower-prior-knowledge learners benefit from higher assistance and higher-prior-knowledge learners can benefit from lower assistance. The meta-analysis also stresses an important asymmetry: ensuring assistance for novices is the stronger priority. The UI therefore never removes Core scaffolding and never equates speed with expertise.


## V11.1 — Unlock consolidation rule

The student-facing **UNLOCK** is deliberately richer than the Field Guide card. It reconnects to the immediately preceding discussion, formalises the disciplinary concept, then states how to use it next. The Field Guide keeps only the compact reference version. This avoids both extremes: revealing the formal answer before exploration, and leaving discovery unformalised afterwards.


## Collective restitution / visible thinking

The Projector should not become a classroom-response dashboard. Student work already exists on student devices and in group discussion; the projected surface only needs to focus the room. For each important restitution, use **one discussion question** and then **one full-width flip card**.

The card back has two functions only:

1. **Student takeaway first** — students reveal the formal concept on their own surface after discussion.
2. **Essential complements on Projector** — at most 2–3 important facts, distinctions or boundaries that are not already on the student takeaway and that the room should still leave with.

All alternative prompts, misconceptions, accepted answer families, examples, references, measurements and reality checks remain in `notes.html`. This preserves pedagogical depth without making the projected interface carry the whole instructor script.

Authoring rule: **students produce and discuss the reasoning; the student takeaway formalises it; the single Projector reveal only completes it.**

After the final restitution, close with one **static Projector synthesis**: at most three durable ideas, one visual model that compresses the session, and one forward question that creates the need for the next session. This screen has no interaction and is not a ninth activity.


## Activity count is curriculum-driven

Do **not** force different sessions to contain the same number of activities. Symmetry across sessions is not a design invariant. The invariant applies **within one session**: Student, Projector and Instructor Notes must expose the same canonical activity count, order, numbering and short titles. Add an activity when a concept needs its own cycle of prediction → externalisation → challenge → institutionalisation; do not merge it merely to preserve a visual count.


## Cross-session Mission dossier

The running case uses a deliberately small cross-session record. Do **not** turn it into a transcript of student work. Session-internal state (screen, unlocks, retrieval, optional depth, hints) stays separate. The shared dossier contains only structured engineering decisions that are safe to reuse: current defended design class, Top-3 requirements, access stance, one unresolved uncertainty, and the revision trigger. Session 2 personalises its handover from these fields but must always remain fully teachable with the generic fallback. Free text and diagrams may be exported for the student, but they must not be parsed or used to control later pedagogy.


## Instructor cockpit rule

The instructor home page is a **teaching cockpit first** and an authoring workspace second. Above the fold it exposes the current mission, Projector, facilitation notes, student access and non-negotiable outcomes. Publishing and pattern-maintenance tools are secondary and collapsible. The canonical activity sequence, not a target duration, defines the instructional spine.


### Session 2 artefact rule (v1.22)

For protocol-heavy material, prefer **construct / classify / compose / trace** over repeated free-text justification. A structured interaction is not automatically simplistic: it is valuable when several pieces must be combined into an auditable artefact and the class STOP is where correctness is challenged. Avoid clue cards whose wording already names the answer. Optional Challenge-me routes may use short prose because they intentionally reduce scaffolding.

### Intervention clarity rule

Student-facing stakeholder interventions use one fixed reading order: **STARTING POINT → NEW INPUT → DESIGN IMPACT → YOUR MOVE**. The character contributes only new evidence, need, contradiction or incident. `STARTING POINT` recalls the minimum prior state needed to interpret it; `DESIGN IMPACT` states what has become unresolved without giving the solution; the activity alone owns the instruction under `YOUR MOVE`. Avoid adding a second case-state or mission-state block when the same information is already visible in the session handover.

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

1. **Landscape** — students classify connected physical systems before receiving a working view of IoT.
2. **Campus mission** — they receive an explicit dossier with known facts, intentionally missing facts, and a design role.
3. **Defended baseline** — they build responsibilities and information flows before naming communication technologies.
4. **Requirements** — they reason in plain language first; formal vocabulary is unlocked after discussion.
5. **Communication discovery** — network shapes are understood before technology names and deeper jargon.
6. **Investigation** — students retrieve those families, calibrate confidence, and inspect technical depth on demand.
7. **Transfer** — non-campus cases test whether the decision logic generalises.
8. **Return to campus** — students identify the missing assumption most likely to change their connectivity stance.
9. **Incident + revision record** — a changed assumption forces one concrete structural change relative to the preserved baseline.
10. **Memory Lock** — retrieval comes before the final synthesis.

## STOP ritual used throughout

Every classroom STOP follows:

**LOOK → COMPARE → CHALLENGE → UNLOCK**

- LOOK: the student page automatically reproduces the group artifact.
- COMPARE: one question is used to expose alternative reasoning.
- CHALLENGE: a counterexample is revealed on teacher instruction.
- UNLOCK: the formal concept is shown and added to the persistent Field Guide. The next stage remains locked until the unlock occurs.

## Concepts added to the Field Guide

1. **Working view of IoT** — physical entities observed/acted upon, connected to digital services through communication/computation.
2. **Architecture lens** — Sense/Act · Communicate · Compute · Store · Use are responsibilities, not mandatory boxes.
3. **Engineering vocabulary** — Range, data volume/throughput, latency, reliability, energy, scale, mobility, infrastructure, cost.
4. **Technology decision rule** — communication problem → network shape → technology family; technology choice implies infrastructure and dependencies.

## Why the defended baseline is preserved

After STOP 2, the defended baseline is stored separately. Later evidence does not erase the original artifact. During the incident, students record the structural change forced by the broken assumption. The final screen keeps the baseline and the justified revision visible side-by-side.

This makes the central learning claim observable:

**changed assumption → changed requirement → changed architecture**.

## Research basis

See `LEARNING-DESIGN-PATTERN.md` for the evidence synthesis and reusable authoring checklist.

## Navigation rule added in V10.1

The session now separates the **learning frontier** from the **screen currently viewed**. Students may revisit any already unlocked stage, while future stages remain gated. A visible Review mode and one-click return to the current mission reduce disorientation. Historically meaningful commitments are preserved: the defended baseline becomes read-only after STOP 2, while later evidence is represented as an explicit revision record.

This is intentionally **structured learner control**, not unrestricted hypermedia navigation. Reviews of learner control report mixed or near-zero average effects and warn that additional navigation choices can increase metacognitive/cognitive demands, especially when learners lack prior knowledge. The design therefore gives students review freedom but not freedom to expose future concepts or silently rewrite committed artifacts.

Relevant sources: Scheiter & Gerjets (2007), *Educational Psychology Review*; Karich, Burns & Maki (2014), *Review of Educational Research*.


## Adaptive depth in Session 1

Session 1 uses four optional `Challenge me` routes: architecture, requirements, communication-shape discovery, and compound stress. Each route begins as an open problem and offers three progressively revealed supports. Support use is visible but ungraded.

The technology investigation also contains three `Research trails`. Learners must make a prediction before the official source link appears, then write what the source confirmed, nuanced, or overturned. This prevents authentic sources from becoming passive “extra reading”.

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

The instructor home page is a **teaching cockpit first** and an authoring workspace second. Above the fold it must expose the current mission, Projector, facilitation notes, student access, non-negotiable outcomes and pacing mode. Publishing and pattern-maintenance tools are secondary and collapsible. Session notes distinguish a strict 90-minute Core run from the full-depth envelope; the Core route compresses time but preserves the conceptual sequence and institutionalisation points.


### Session 2 artefact rule (v1.22)

For protocol-heavy material, prefer **construct / classify / compose / trace** over repeated free-text justification. A structured interaction is not automatically simplistic: it is valuable when several pieces must be combined into an auditable artefact and the class STOP is where correctness is challenged. Avoid clue cards whose wording already names the answer. Optional Challenge-me routes may use short prose because they intentionally reduce scaffolding.

### Intervention clarity rule

Student-facing stakeholder interventions use one fixed reading order: **STARTING POINT → NEW INPUT → DESIGN IMPACT → YOUR MOVE**. The character contributes only new evidence, need, contradiction or incident. `STARTING POINT` recalls the minimum prior state needed to interpret it; `DESIGN IMPACT` states what has become unresolved without giving the solution; the activity alone owns the instruction under `YOUR MOVE`. Avoid adding a second case-state or mission-state block when the same information is already visible in the session handover.

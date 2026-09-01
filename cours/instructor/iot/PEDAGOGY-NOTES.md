# IoT Systems Design — Session 1 pedagogy notes (V10)

This session is the reference implementation of the **Mission–Artifact–Challenge–Unlock (MACU)** pattern documented in `LEARNING-DESIGN-PATTERN.md`.

## Session-specific learning story

1. **Landscape** — students classify connected physical systems before receiving a working view of IoT.
2. **Campus mission** — they receive an explicit dossier with known facts, intentionally missing facts, and a design role.
3. **Architecture v1** — they build responsibilities and information flows before naming communication technologies.
4. **Requirements** — they reason in plain language first; formal vocabulary is unlocked after discussion.
5. **Communication discovery** — network shapes are understood before technology names and deeper jargon.
6. **Investigation** — students retrieve those families, calibrate confidence, and inspect technical depth on demand.
7. **Transfer** — non-campus cases test whether the decision logic generalises.
8. **Return to campus** — students identify the missing assumption most likely to change their connectivity stance.
9. **Incident + architecture v2** — a changed assumption forces one concrete structural revision of the frozen v1.
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

## Why architecture v1 is frozen

After STOP 2, v1 is stored separately. Later edits do not erase the original artifact. During the incident, students edit a copy to create v2. The final screen shows v1 and v2 side-by-side.

This makes the central learning claim observable:

**changed assumption → changed requirement → changed architecture**.

## Research basis

See `LEARNING-DESIGN-PATTERN.md` for the evidence synthesis and reusable authoring checklist.

## Navigation rule added in V10.1

The session now separates the **learning frontier** from the **screen currently viewed**. Students may revisit any already unlocked stage, while future stages remain gated. A visible Review mode and one-click return to the current mission reduce disorientation. Historically meaningful commitments are preserved: architecture v1 becomes read-only after STOP 2, while later changes are represented as v2.

This is intentionally **structured learner control**, not unrestricted hypermedia navigation. Reviews of learner control report mixed or near-zero average effects and warn that additional navigation choices can increase metacognitive/cognitive demands, especially when learners lack prior knowledge. The design therefore gives students review freedom but not freedom to expose future concepts or silently rewrite committed artifacts.

Relevant sources: Scheiter & Gerjets (2007), *Educational Psychology Review*; Karich, Burns & Maki (2014), *Review of Educational Research*.


## Adaptive depth in Session 1

Session 1 uses four optional `Challenge me` routes: architecture, requirements, communication-shape discovery, and compound stress. Each route begins as an open problem and offers three progressively revealed supports. Support use is visible but ungraded.

The technology investigation also contains three `Research trails`. Learners must make a prediction before the official source link appears, then write what the source confirmed, nuanced, or overturned. This prevents authentic sources from becoming passive “extra reading”.

This implementation is motivated by the expertise-reversal literature, particularly Tetzlaff & Simonsmeier (2025), which reports that lower-prior-knowledge learners benefit from higher assistance and higher-prior-knowledge learners can benefit from lower assistance. The meta-analysis also stresses an important asymmetry: ensuring assistance for novices is the stronger priority. The UI therefore never removes Core scaffolding and never equates speed with expertise.


## V11.1 — Unlock consolidation rule

The student-facing **UNLOCK** is deliberately richer than the Field Guide card. It reconnects to the immediately preceding discussion, formalises the disciplinary concept, then states how to use it next. The Field Guide keeps only the compact reference version. This avoids both extremes: revealing the formal answer before exploration, and leaving discovery unformalised afterwards.


## Collective restitution / visible thinking

V14 adds a lightweight instructor-entered **Live Board** rather than a classroom-response backend. The purpose is to make selected student thinking externally visible in a representation matched to the task: short ideas (Capture), relations (Structure), or committed distributions (Compare). This follows the broader visible-thinking/documentation rationale: externalise thinking so the class can inspect and revise it, rather than treating responses as ephemeral talk.

For class distributions, use **commit → aggregate → discuss**. Peer-instruction research has shown that exposing a class histogram before a second response can pull students toward the majority; therefore the collective tally should appear only after groups have committed their own reasoning. The board is evidence about the room, not an answer key.

Design restraint matters: multiple representations can support learning when they clarify complementary information, but unnecessary representations can add processing demands. The Live Board is therefore optional and limited to three stable primitives rather than a bespoke widget per activity.

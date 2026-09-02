# IoT Systems Design — Session 2

**Mission:** How do things communicate?

Canonical nine-activity skeleton shared by Student / Projector / Instructor Notes:

1. Describe the conversations
2. Draw a message choreography
3. Build the stack by responsibility
4. Audit network and transport evidence
5. Build an application-protocol evidence map
6. Repair the interoperability contract
7. Compose complete stacks
8. Build scoped delivery contracts
9. Build an auditable failure trace

Core reasoning loop:

**service need → interaction pattern → choreography → message meaning → stack responsibilities → protocol composition → delivery semantics → failure test**

Design principle: students reason about roles, scopes and interaction patterns before protocol names are treated as design answers.

## Discussion and institutionalisation

Activities 1, 2, 3, 6, 7, 8 and 9 include a full student STOP aligned with the Projector restitution:

**LOOK → COMPARE → CHALLENGE → UNLOCK**

At each STOP, the student's own artifact remains visible. The counterexample is revealed during discussion, then the formal concept is explicitly consolidated before the next activity unlocks. The resulting compact reference map is added to the persistent **Field guide**.

Activities 4 and 5 remain WORK-only on purpose. Activity 4 uses one-shot evidence classification with immediate scope/boundary feedback; incorrect classifications remain discussable rather than blocking progress. Activity 5 exposes the protocol evidence as a reference and asks for three service decisions with one decisive reason each; fragment sorting is optional. Their protocol map is institutionalised during the Activity 7 composition STOP.

The Core route remains sufficient for novices. Four optional **Challenge me** routes add deeper reasoning at genuine bottlenecks: multi-row suites, schema/semantic mapping, MQTT over Thread, and duplicate-operation crash windows. They rejoin the same activity progression and do not reveal future protocol answers.

The Field guide accumulates seven reusable reference maps:

- interaction patterns;
- topology vs message choreography;
- stack responsibilities;
- protocol vs semantic interoperability;
- protocol composition across abstraction levels;
- scoped delivery guarantees;
- end-to-end failure tracing.

## Navigation model

The session uses the same soft-linearity principle as Session 1:

- future work stays gated;
- already reached activities remain reviewable;
- review mode is explicit;
- a one-click action returns to the furthest unlocked point;
- STOP conclusions must be consolidated before the next activity opens.

## Session close

Activity 9 now has its own explicit STOP rather than collapsing failure discussion into the final screen. The session then finishes with a six-question **Memory Lock**. Students retrieve each answer before revealing it; only after all six prompts does the final synthesis appear.

This preserves the intended rule:

**retrieve first → reveal → synthesise**.

Session 2 is intentionally longer than Session 1. Activity count is determined by conceptual work, not visual symmetry. The dedicated delivery-semantics activity prevents the final failure test from introducing reliability, retries, duplicate effects and offline persistence for the first time.

## Running case

This session is part of one continuous campus engineering case. Stakeholder interventions introduce only decision-relevant information: service needs, field constraints, architecture claims, integration problems or incidents. The narrative is therefore functional rather than decorative.

**Trigger / dossier / task separation:** the stakeholder intervention introduces the change or decision tension; the dossier/state block carries factual evidence; the activity prompt states the student task. These three surfaces must not restate the same information.


## Mission dossier across sessions

The student workspace keeps pedagogical progress (screens, unlocks, retrieval, hints) inside the session state, but publishes only a small structured **Mission dossier** across sessions. Session 1 records the classified Architecture v2 pattern, Top-3 communication requirements, campus access stance, key open uncertainty, and the incident that triggered revision. Session 2 reads those fields when available and otherwise uses a generic fallback. Free-text answers are never interpreted to drive the next session. The export file contains the Mission dossier plus the current session progress so it can also be moved to another browser.


## v1.22 interaction principle

Session 2 uses the same visible three-step Core workflow grammar as Session 1. Dense activities avoid hidden answer-key gates. Progressive disclosure is used only when it clarifies the reasoning sequence; reference material remains visible when hiding it would create unnecessary clicks.

Session 2 deliberately avoids worksheet-style prose entry in the Core route. Students build inspectable artefacts: conversation-pattern decisions, a message choreography, responsibility stack, lower-stack classifications, application service choices, an interoperability repair, complete stacks, a scoped retry/crash analysis and a failure trace. Reference boards can be explored without becoming completion gates. Optional Challenge-me routes may still ask for a short defended response.

### Restitution structure

Activities 4–5 form a deliberate **protocol evidence block**: students audit lower-stack evidence, then application-protocol evidence, without a full class STOP between them. Their interfaces contain embedded factual audits. The Activity 3 STOP must therefore stay protocol-name neutral, and the complete protocol map is institutionalised later at the **Compose complete stacks** STOP. A short 60–90 s instructor calibration is acceptable if a shared misconception survives an embedded audit; it is not a separate concept unlock.

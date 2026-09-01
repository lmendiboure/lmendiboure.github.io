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

## Discussion and institutionalisation

Activities 1, 2, 3, 6, 7, 8 and 9 include a full student STOP aligned with the Projector restitution:

**LOOK → COMPARE → CHALLENGE → UNLOCK**

At each STOP, the student's own artifact remains visible. The counterexample is revealed during discussion, then the formal concept is explicitly consolidated before the next activity unlocks. The resulting compact reference map is added to the persistent **Field guide**.

Activities 4 and 5 remain WORK-only on purpose. They use predict-before-reveal cards to introduce concrete protocol names without interrupting the discovery sequence with premature whole-class correction. Their protocol map is institutionalised during the Activity 7 composition STOP.

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

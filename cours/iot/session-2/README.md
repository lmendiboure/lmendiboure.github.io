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

## Discussion and institutionalisation

Activities 1, 2, 3, 6, 7, 8 and 9 include a full student STOP aligned with the Projector restitution:

**LOOK → COMPARE → CHALLENGE → UNLOCK**

At each STOP, the student's own artifact remains visible. The counterexample is revealed during discussion, then the formal concept is explicitly consolidated before the next activity unlocks. The resulting compact reference map is added to the persistent **Field guide**.

Activities 4 and 5 remain WORK-only on purpose, but they are no longer recognition exercises. Activity 4 presents the engineering problem solved by each lower-stack technology before revealing its name. Activity 5 starts from three understandable application exchange needs before attaching MQTT, CoAP and HTTP. Incorrect classifications remain discussable rather than blocking progress.

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

Activities 4–5 form a deliberate **name-after-need block**. Activity 3 first establishes the engineering jobs in plain language. Activity 4 attaches lower-stack names to those jobs from problem-first clues. Activity 5 attaches application-protocol names to service behaviours already understood from Activity 1. A short instructor calibration is acceptable, but do not convert unfamiliar vocabulary into a prerequisite.

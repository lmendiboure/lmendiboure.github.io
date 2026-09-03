# IoT Systems Design — Session 2

**Mission:** How do things communicate?

## Canonical eight-activity sequence

1. Describe the conversation
2. Make message order visible
3. Separate four communication jobs
4. Read one complete stack, then complete a partial stack
5. Choose among MQTT, CoAP and HTTP from service behaviour
6. Compose one protocol path, audit compatibility, then transfer one lower-layer change
7. Repair a data contract so the payload is understandable
8. Defend one implementable campus exchange

Core reasoning loop:

**service behaviour → message order → communication responsibilities → worked stack → application protocol → composition → shared meaning → defended design**

## Scope decision

Session 2 deliberately stops before delivery-semantics and failure-analysis material.

The following concepts are **deferred to Session 4 — Robustness**:

- protocol-level QoS and acknowledgement semantics;
- at-most-once / at-least-once / exactly-once claims;
- retry crash windows and duplicate operation effects;
- end-to-end failure tracing;
- physical-state confirmation as a robustness mechanism.

They are important, but they create a second conceptual arc. Keeping them in Session 2 forces novices to build too many interdependent mental models in one sitting. Session 3 remains focused on device / edge / cloud placement and therefore is not the right destination for this material.

## Design rationale

The session now uses three instructional moves repeatedly:

1. **Problem before term.** Students first see the engineering need in ordinary language.
2. **Worked example before independent completion.** Activity 1 and Activity 4 provide a complete example before students complete a related case.
3. **Progressive disclosure.** Technical detail appears when it answers the current question; optional mechanisms such as 6LoWPAN are not part of the core decision set.

The initial stack model contains four responsibilities only:

- Application
- Transport
- Network
- Local access

6LoWPAN is introduced as an adaptation mechanism used under IPv6 on constrained IEEE 802.15.4 links, not as a fifth mental category students must manipulate in the core route.

## Page-density rule

A core activity should normally contain only:

- one short problem statement;
- one worked example or compact reference when required;
- one main student manipulation;
- one short takeaway / boundary.

Avoid stacking stakeholder story + glossary + workflow + interaction + reflection + optional challenge on the same screen. Optional depth belongs in a `<details>` reference or instructor discussion, not in the main visual hierarchy.

## Discussion rhythm

Five STOPs are retained, after Activities 1, 3, 5, 7 and 8. Each STOP uses:

**student artifact → one comparison/challenge question → concise “what to keep” reveal**

There is no hidden answer-key gate. Students must commit to a decision, but an incorrect decision is discussion evidence rather than a progression failure.

## Mission dossier

Session 2 publishes only compact design state for later sessions:

- interaction-pattern choices;
- the partial worked-stack completion;
- application-protocol choices;
- one composed path plus a compatibility audit and a lower-path transfer test;
- the semantic contract elements selected;
- the final defended exchange.

Pedagogical navigation state remains local to the session.

## Projector grammar (v1.42)

Both sessions use the same deliberately minimal public sequence: **ACTIVITY → RESTITUTION QUESTION → ONE PROBE CARD → FLIP → NEXT**, followed once by a **static session conclusion** after the final restitution. WORK shows one question, short context and the expected artefact. A RESTITUTION shows one student-facing restitution question and one full-width card. The card front deepens the discussion with one or two concrete prompts; the back contains at most 2–3 essential complementary points not already established by students. Follow-up prompts, references, metrics, counterexamples and optional depth stay in `notes.html`, not on the Projector.



## Session conclusion

After the final restitution, the Projector ends on one static, student-facing synthesis screen: **three takeaways maximum → one visual model → one transition question to the next session**. It has no flip, reveal, board or extra interaction. It is a closure screen, not an additional canonical activity, so activity counts remain unchanged.

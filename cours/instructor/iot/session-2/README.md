# IoT Systems Design — Session 2

**Mission:** How does one useful message cross the system?

## Canonical seven-activity sequence

1. Describe the service conversation.
2. Build the four-row stack map: Application / Transport / Network / Local path.
3. Place MQTT, CoAP and HTTP on the Application row and choose from service behaviour.
4. Add Transport and Network: TCP / UDP / IP / IPv6.
5. Reconnect the stack to the local path; introduce Thread over IEEE 802.15.4 only here.
6. Add shared payload meaning.
7. Build one complete end-to-end campus stack.

Core reasoning loop:

**service behaviour → Application → Transport → Network → Local path → Shared meaning**

## Main design rule

The Projector and Student workspace use the same stack map throughout the session. New protocol names are introduced only after the responsibility they belong to is visible.

- MQTT / CoAP / HTTP are compared at **Application**.
- TCP / UDP are compared at **Transport**.
- IP / IPv6 occupy **Network**.
- Wi-Fi and constrained paths such as **Thread over IEEE 802.15.4** are discussed as local connectivity paths.
- Real suites can span more than one conceptual row; the rows are responsibilities, not a claim that every named technology maps perfectly to one OSI layer. Some Session 1 access families can also introduce gateway/network-service infrastructure instead of exposing this exact reference stack end-to-end.

## Thread / 6LoWPAN timing

Do not mention Thread before Activity 5. Activity 5 gives one student-facing definition before using it:

- Thread: an IPv6-based low-power mesh networking stack using IEEE 802.15.4 radios.

6LoWPAN is **not core student content in this session**. Keep it as an instructor-side technical clarification only if a student asks how IPv6 is carried efficiently over constrained 802.15.4 links.

## Non-blocking interaction rule

Every activity is reachable from the stepper. Continue buttons are always enabled. Immediate feedback is used instead of gates:

- green = reference / correct placement;
- amber = plausible but context-dependent;
- red = revisit the conceptual row or stated case.

## Scope boundary

Session 2 deliberately excludes protocol QoS, retry semantics, exactly-once claims and failure tracing. These belong to Session 4 — Robustness.

## Projector role

The Projector is not only a restitution screen. It progressively builds the shared stack model so students can see where each newly introduced protocol belongs. The same map should remain recognisable from Activity 2 through the final synthesis.

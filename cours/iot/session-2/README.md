# IoT Systems Design — Session 2

**Mission:** How does one useful message cross the system?

## Canonical seven-activity sequence

1. Describe the **service interaction**: one-way, request/response, publish/subscribe, command/acknowledgement.
2. Build the four-responsibility communication map: **Application protocol / Transport / Network / Local connectivity**.
3. Compare **MQTT / CoAP / HTTP** only after the Application-protocol responsibility is visible.
4. Add **TCP / UDP / IP / IPv6** and consolidate the reference bindings only after students attempt the cases.
5. Reconnect the upper communication path to **local connectivity**, introducing Thread over IEEE 802.15.4 only here.
6. Add the **data contract** needed to interpret the application payload.
7. Build one complete campus exchange from service interaction to stack + data contract.

Core model:

- **Above the stack:** Service interaction — what exchange does the service need?
- **Communication stack:** Application protocol → Transport → Network → Local connectivity.
- **With the application payload:** Data contract / semantics.

This is a **design map**, not a replacement for the complete OSI model.

## Scope decision

Session 2 deliberately stops before delivery-semantics and failure-analysis material. Protocol QoS, retries, duplicate effects, exactly-once claims and end-to-end failure tracing are deferred to **Session 4 — Robustness**.

## Pedagogical rule

The same map is kept throughout the session. New protocol names appear only after the responsibility they belong to is visible.

Before each activity, students see only the information required to work. Detailed reference comparisons are shown **after** the activity in the class restitution / Projector. This prevents the Projector from pre-revealing the answer.

Interactions are deliberately simple and non-blocking. Immediate feedback is used instead of gates:

- green = reference / correct placement;
- amber = plausible but context-dependent;
- red = revisit the stated case or responsibility.


## Discussion / consolidation

The Projector is used as the shared teaching surface after student work:

- A1: visual differences between the four interaction patterns;
- A2: one familiar complete stack and the role of each responsibility;
- A3: detailed MQTT / CoAP / HTTP comparison;
- A4: TCP / UDP / IP roles and the reference bindings used in the course;
- A5: complete stacks and the “compare within a job / compose across jobs” rule;
- A6: delivery/naming versus data meaning;
- A7: final integrated design map.

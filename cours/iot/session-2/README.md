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

**service need → interaction pattern → message meaning → stack responsibilities → protocol composition → failure semantics**

Design principle: students reason about roles and interaction patterns before protocol names are revealed.


Session 2 is intentionally longer than Session 1. Activity count is determined by the conceptual work, not by symmetry across sessions. The dedicated delivery-semantics activity prevents the final stress-test from having to introduce reliability, retries, duplicate effects and offline persistence for the first time.

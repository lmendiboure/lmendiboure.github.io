# IoT Systems Design — Session 3

**Mission:** Where should the work happen?

## Canonical eight-activity sequence

1. Place functions independently across device / nearby / remote zones
2. Compare raw transfer with local aggregation / event extraction
3. Test placement against explicit response budgets
4. Check compute / memory / energy feasibility before optimisation
5. Use a transfer case to minimise sensitive/raw data crossing a boundary
6. Distinguish a forwarding gateway from a nearby node executing application work
7. Build one split device–nearby–remote pipeline and define its data boundary
8. Change one operating assumption and make the minimum justified placement revision

Core reasoning loop:

**function → constraint → feasible zones → data boundary → defended placement → re-test when assumptions change**

## Scope decision

Session 3 is deliberately about **placement**, not robustness.

It does **not** teach retries, QoS, duplicate effects, crash windows or failure recovery. Those concepts remain in Session 4. Connectivity quality may appear as a placement assumption, but failure-handling mechanisms are not introduced here.

## Vocabulary rule

Do not begin with edge/fog/cloud terminology. Students first reason with three ordinary deployment zones:

- on the device;
- nearby the site;
- remote infrastructure.

Only after Activity 6 do we explicitly name an **edge-computing role**: application work executing closer to the data source rather than only in remote infrastructure. This avoids presenting “edge” as a magic product category or a mandatory architecture.

## Placement criteria used in the core route

- response / locality budget;
- compute and memory feasibility;
- energy budget;
- amount of data moved;
- data minimisation / privacy boundary;
- fleet or workload scale.

The session deliberately avoids pretending these criteria always point in the same direction.

## Discussion rhythm

Five STOPs are retained, after Activities 1, 3, 5, 7 and 8.

Each STOP follows the course-wide pattern:

**student artifact → one class question → student takeaway → one projector flip with 2–3 complementary ideas**

## Timing

Core target: **90 min**

- A1: 7 min work + 5 min STOP
- A2: 8 min
- A3: 7 min work + 5 min STOP
- A4: 9 min
- A5: 7 min work + 5 min STOP
- A6: 7 min
- A7: 9 min work + 5 min STOP
- A8: 7 min work + 5 min FINAL STOP
- retrieval close: 4 min

## Mission dossier

Session 3 publishes:

- initial function placements;
- chosen data-handling strategy;
- response-budget placement decisions;
- feasibility decisions;
- privacy/data-minimisation boundary;
- functions moved into a nearby compute role;
- final split pipeline and boundary payload;
- changed assumption and justified placement revision.

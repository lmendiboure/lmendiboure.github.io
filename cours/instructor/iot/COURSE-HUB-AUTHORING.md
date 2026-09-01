# Course-level authoring pattern

The session-level learning pattern is most useful when it is nested inside a stable course-level structure.

## Cross-surface activity identity

Within every released session, define one canonical ordered activity list. Student, Projector and Instructor Notes must preserve the same activity count, numbering, order and short titles. Publication/navigation surfaces may differ in depth, but never in activity identity. A Projector may omit a RESTITUTION screen for an activity; it may not omit, merge or renumber the activity itself.

## Course layer

Use the following sequence:

**ORIENT → MISSION → RECONNECT**

### ORIENT

The course hub should answer only four questions:

1. What is the overall capability this course is building?
2. What are the major missions/questions?
3. Which mission is available now?
4. How do the missions connect conceptually?

It should not reveal answers or technical detail that a later mission is designed to make students discover.

### MISSION

Each session implements the MACU cycle documented in `LEARNING-DESIGN-PATTERN.md`.

### RECONNECT

At the end of each mission, reconnect the session takeaway to the course map. The next mission should feel like the next unresolved design question, not an unrelated chapter.

## Student hub card contract

Each session card should contain:

- one motivating question;
- one concise summary;
- two or three capability tags;
- one release state;
- no hidden answer to the mission.

Avoid turning the course hub into a syllabus page full of terminology.

## Release states

- **Open** — current mission, published and clickable.
- **Review** — previous mission, still published and clickable.
- **Locked** — future destination visible, but no student page should be published yet.

The visual lock is for orientation, not security.

## Course-level invariant

> Students should know **where the course is going** without being shown **what a future activity is meant to make them discover**.

## Minimal release control

For a sequential four-session course, avoid hand-editing several card states. Keep a single integer such as `releasedThrough` in the course configuration. Derive `Review / Current / Locked` from session order. This reduces publishing errors and makes the release ritual reproducible.


## Adaptive depth across sessions

The course hub should not split students into visible “easy” and “advanced” tracks. Differentiation happens inside each mission using the session-level `Core → Challenge → Research` pattern. The hub remains a common orientation layer for everyone.

When authoring later sessions:

- keep the Core route sufficient for a novice;
- use 3–4 `Challenge me` routes at genuine conceptual bottlenecks;
- use 0–3 authentic-source Research Trails;
- let all routes rejoin the same STOP / mission progression;
- never infer expertise from completion speed alone.


## Activity count is curriculum-driven

Do **not** force different sessions to contain the same number of activities. Symmetry across sessions is not a design invariant. The invariant applies **within one session**: Student, Projector and Instructor Notes must expose the same canonical activity count, order, numbering and short titles. Add an activity when a concept needs its own cycle of prediction → externalisation → challenge → institutionalisation; do not merge it merely to preserve a visual count.

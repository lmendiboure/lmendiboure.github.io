# Course-level authoring pattern

The session-level learning pattern is most useful when it is nested inside a stable course-level structure.

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

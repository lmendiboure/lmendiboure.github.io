# Session 1 instructor surfaces

- `index.html` — **Projector Mode**, safe to screen-share.
- `notes.html` — **Private instructor notes** with accepted answers, misconceptions, technical precision, fallback prompts and transitions.

## Structural invariant

Student, Projector and Notes use exactly the same eight canonical activities:

1. Map the IoT landscape
2. Build architecture v1
3. Close the loop
4. Expose communication requirements
5. Discover network shapes
6. Investigate technologies
7. Choose under constraints
8. Stress-test and revise

The Projector gives every activity one WORK screen. Activities 1, 2, 3, 4, 7 and 8 also have one RESTITUTION screen; Activities 5 and 6 are intentionally WORK-only. A missing restitution never changes numbering or merges activities.

## Projector controls

- Right arrow / Space: advance to RESTITUTION when the current activity has one; otherwise advance directly to the next activity WORK screen.
- Left arrow: go back one public screen.
- `F`: fullscreen.
- Eight progress markers represent the same eight activities and open their WORK screen.

**WORK** states the task, deliverable/defence prompt and guardrail. **RESTITUTION** is one stable class screen containing an optional Live Board, 2–3 discussion prompts, a counterexample, and an in-place conclusion dock with **What to keep** / **Reality check**.

The private sequence **LOOK → COMPARE → CHALLENGE → FORMALISE → GROUND** lives in `notes.html`, not in projector navigation. Do not project `notes.html`.

## Pacing

Targets are split per activity. The full envelope remains roughly 100–120 minutes, depending on discussion depth. Treat timings as pacing cues, not mandatory cut-offs.

## Collective restitution

Capture, Structure and Compare are the only Live Board primitives. Use **commit → aggregate → discuss**. No backend is required.

## Reusing Session 1

The Projector stores class-entered Live Board state only for the current browser session.

- **Clear board** resets the current Capture / Structure / Compare board.
- **New class** clears all class-entered boards and tallies, closes What-to-keep/Reality reveals, and returns to Activity 1 / WORK.
- Student progress is separate and is never changed by either instructor reset.

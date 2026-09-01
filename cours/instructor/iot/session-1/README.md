# Session 1 instructor surfaces

- `index.html` — **Projector Mode**, safe to screen-share.
- `notes.html` — **Private instructor notes** with accepted answers, misconceptions, technical precision, fallback prompts and transitions.

## Structural invariant

Student, Projector and Notes use exactly the same seven canonical activities:

1. Map the IoT landscape
2. Build architecture v1
3. Expose communication requirements
4. Discover communication patterns
5. Investigate technologies
6. Choose under constraints
7. Stress-test and revise

The Projector gives every activity one WORK screen. Activities 1, 2, 3, 6 and 7 also have one RESTITUTION screen; Activities 4 and 5 are intentionally WORK-only. A missing restitution never changes numbering or merges activities.

## Projector controls

- Right arrow / Space: advance to RESTITUTION when the current activity has one; otherwise advance directly to the next activity WORK screen.
- Left arrow: go back one public screen.
- `F`: fullscreen.
- Seven progress markers represent the same seven activities and open their WORK screen.

**WORK** states the task, deliverable/defence prompt and guardrail. **RESTITUTION** is one stable class screen containing an optional Live Board, 2–3 discussion prompts, a counterexample, and in-place Takeaway/Reality reveals.

The private sequence **LOOK → COMPARE → CHALLENGE → FORMALISE → GROUND** lives in `notes.html`, not in projector navigation. Do not project `notes.html`.

## Pacing

Targets are split per activity. The full envelope remains roughly 78–95 minutes. Treat timings as pacing cues, not mandatory cut-offs.

## Collective restitution

Capture, Structure and Compare are the only Live Board primitives. Use **commit → aggregate → discuss**. No backend is required.

## Reusing Session 1

The Projector stores class-entered Live Board state only for the current browser session.

- **Clear board** resets the current Capture / Structure / Compare board.
- **New class** clears all class-entered boards and tallies, closes Takeaway/Reality reveals, and returns to Activity 1 / WORK.
- Student progress is separate and is never changed by either instructor reset.

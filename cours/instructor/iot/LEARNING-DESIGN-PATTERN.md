# Mission–Artifact–Challenge–Unlock (MACU) learning-design pattern

A reusable pattern for interactive first-exposure university courses, especially engineering and computing.

The pattern is **not** a claim that one exact sequence has been experimentally validated as a package. It is a design synthesis grounded in well-supported instructional principles: active learning, constructive/interactive engagement, novice scaffolding and example-based learning, self-explanation, retrieval practice, case/problem-based learning, and cautious use of gamification.

## 1. The core loop

For each important concept, use this loop:

1. **MISSION / DISCOVER** — give students a concrete problem before the formal rule when discovery is feasible.
2. **PRODUCE AN ARTIFACT** — classification, diagram, decision, ranking, explanation, prediction, etc.
3. **LOOK** — at the STOP, display the group’s own artifact, not a generic answer.
4. **COMPARE** — students explain differences between groups or between flows/cases.
5. **CHALLENGE** — introduce one counterexample or changed assumption that tests the emerging rule.
6. **UNLOCK** — only now consolidate the concept in three moves: **student evidence → formal concept → actionable rule**. Add only the compressed reference version to the persistent Field Guide.
7. **TRANSFER** — use a different surface context to test whether the principle generalises.
8. **REVISE** — make learning visible by changing the original artifact when assumptions change.
9. **RETRIEVE** — ask for recall/transfer before showing the final synthesis.

Short form:

**Discover → Externalise → Compare → Challenge → Formalise → Transfer → Revise → Retrieve**

## 2. Why these elements are here

### Active rather than passive
Freeman et al. (2014) meta-analysed 225 STEM studies and found better performance under active learning than traditional lecturing. This supports making student reasoning the main activity rather than using the website as a slide deck.

- Freeman et al., PNAS, 2014: https://doi.org/10.1073/pnas.1319030111

### Constructive and interactive engagement
The ICAP framework distinguishes Passive, Active, Constructive and Interactive engagement, predicting deeper learning when students generate explanations, infer, compare and dialogue rather than merely manipulate interface elements.

Design implication: a click is not enough. Important interactions should produce a claim, explanation, comparison, prediction or revision.

- Chi & Wylie, Educational Psychologist, 2014: https://doi.org/10.1080/00461520.2014.965823

### Novice scaffolding before independent problem solving
Worked-example and cognitive-load research shows that novices benefit from guidance and examples because unguided problem solving can consume working-memory resources without building useful schemas. Guidance should then fade as knowledge grows.

Design implication: introduce **plain-language mental models before jargon**, and offer optional technical depth rather than assuming vocabulary as prior knowledge.

- van Gog, Paas & Sweller, Educational Psychology Review, 2010: https://doi.org/10.1007/s10648-010-9145-4
- Renkl, Cognitive Science, 2014: https://doi.org/10.1111/cogs.12086

### Self-explanation
Self-explanation prompts have a positive overall effect on learning across tasks and domains. The important action is generation: students explain why a choice follows from assumptions, not only which choice they made.

Design implication: use prompts such as **“Which assumption did most of the work?”**, **“What would change your mind?”**, and **“What does this solution still fail to solve?”**.

- Bisra et al., Educational Psychology Review, 2018 (meta-analysis): https://doi.org/10.1007/s10648-018-9434-x
- Chi et al., Cognitive Science, 1989: https://doi.org/10.1207/s15516709cog1302_1

### Case/problem-based reasoning
Case-method meta-analysis reports advantages for cognitive outcomes over lecture in the analysed studies; problem-based-learning evidence also supports skills/critical-thinking outcomes, while effects depend strongly on implementation.

Design implication: use one **persistent anchor case** for coherence, but add **transfer cases** so students do not merely memorise the anchor solution.

- Bayona & Durán, International Journal of Management Education, 2024: https://doi.org/10.1016/j.ijme.2024.100935
- Dochy et al., Learning and Instruction, 2003: https://doi.org/10.1016/S0959-4752(02)00025-7

### Retrieval practice
Retrieving knowledge improves later retention more than additional restudy in classic testing-effect studies, and retrieval can support meaningful learning and inference.

Design implication: **ask before showing the synthesis**. A Memory Lock should require the learner to reconstruct the concept, then reveal a concise reference answer.

- Roediger & Karpicke, Psychological Science, 2006: https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Karpicke & Blunt, Science, 2011: https://doi.org/10.1126/science.1199327

### Gamification as structure, not decoration
Meta-analyses generally report positive but heterogeneous effects of educational gamification. Effects depend on design; intrinsic-motivation gains can be small, with autonomy and relatedness more responsive than competence.

Design implication: prefer **mission, progressive reveal, commitment, uncertainty, challenge, feedback and optional mastery paths** over leaderboards and arbitrary points.

- Sailer & Homner, Educational Psychology Review, 2020: https://doi.org/10.1007/s10648-019-09498-w
- Li, Hew & Du, Educational Technology Research and Development, 2024: https://doi.org/10.1007/s11423-023-10337-7
- Li, Ma & Shi, Frontiers in Psychology, 2023: https://doi.org/10.3389/fpsyg.2023.1253549

## 3. Structural invariants

These should survive when adapting the pattern to another course.

### A. Do not reveal the target conclusion before the activity
Bad:
> “IoT is everywhere. Now classify these IoT applications.”

Better:
> “Here are eight connected physical systems. How would you classify them?”

The formal conclusion comes at **UNLOCK**, not in the activity title, illustration, example or help text.

### B. Discovery must be followed by formalisation
Do not confuse inquiry with leaving students to invent the discipline.

At each STOP:

**LOOK → COMPARE → CHALLENGE → UNLOCK**

The Field Guide records the formal knowledge after the discussion.

**Unlock ≠ Field Guide.** The Unlock is the explanatory bridge; the Field Guide is the compressed retrieval/reference artifact.

### C. Jargon follows the mental model
For novices:

**plain-language idea → visual/architectural shape → technical name → optional deeper vocabulary**

Example:

“basic local radio-transmission and channel-sharing rules” → IEEE 802.15.4 → PHY/MAC.

### D. One anchor case, several transfer cases
The anchor case provides narrative coherence and accumulating artifacts.

Transfer cases deliberately change superficial features and force the same principles to be applied elsewhere.

Return to the anchor case after transfer.

### E. Every important activity creates a visible artifact
Examples:
- classification map;
- architecture diagram;
- prioritised constraints;
- committed decision + confidence;
- revised design.

At a STOP, show the artifact automatically.

### F. A choice should expose its reasoning
Whenever feasible, record at least one of:
- confidence;
- decisive assumption;
- missing information;
- what would change the decision;
- remaining failure.

### G. Higher-prior-knowledge / fast learners get deeper reasoning, not more reading
A Challenge-me route should add a harder decision, contradiction or edge case while preserving the same objective.

Avoid “read this longer technical paragraph” as the main differentiation mechanism.

### H. Navigation should be softly linear

Use **progressive disclosure forward, open review backward**. Students should not be able to jump to future information before it is earned, but they should always be able to revisit already unlocked work.

Operational rule:

> **Future is gated. Past is reviewable. Meaningful commitments are versioned rather than silently overwritten.**

Implementation implications:

- keep a `max unlocked` frontier distinct from the screen currently being viewed;
- make completed stages clickable;
- show an explicit `Review mode` when the learner is behind the frontier;
- provide a one-click `Return to current mission`;
- never reveal a future STOP, answer or concept through backward navigation;
- freeze historically meaningful artifacts or decisions after commitment/reveal;
- if later evidence changes the learner's view, record a revision (`v1 → v2`, `initial → revised`) rather than replacing the original trace.

This supports reflection and self-regulation without destroying the evidential value of commit-before-reveal activities. It is a design synthesis rather than a claim that this exact navigation pattern has been experimentally isolated as a unit.

### I. Learning should alter an artifact
Freeze an early version (v1), then require a later revision (v2). This creates a concrete before/after representation of conceptual change.

### J. Retrieve before summarising
Do not finish by displaying the takeaway immediately.

Use:

**Recall → Transfer → Reveal → Synthesis**

## 4. The STOP ritual

Every STOP should have the same visual and instructional grammar.

### 1 · LOOK
Display exactly what the group produced.

### 2 · COMPARE
Ask one question where different defensible answers are likely.

Useful forms:
- “Which group made a different assumption?”
- “Did the same priority apply to every flow?”
- “Did two groups choose the same answer for different reasons?”

### 3 · CHALLENGE
Introduce one counterexample or changed assumption.

Purpose: identify whether the emerging rule is too broad.

### 4 · UNLOCK
The Unlock is not a correction card dropped onto the class. It is a short **institutionalisation / consolidation** sequence that resolves the intellectual tension created by the activity.

Every Unlock should contain three moves:

1. **From your discussion** — explicitly reconnect to student artifacts, disagreements or the counterexample just examined.
2. **Formalise it** — introduce the canonical vocabulary, model or disciplinary formulation.
3. **Carry it forward** — state one operational rule students can use in the next decision.

Authoring shorthand:

> **student evidence → canonical concept → actionable rule**

The persistent Field Guide should **not** duplicate this full explanation. It stores a compressed reference card: title, one-sentence rule, one important nuance and a few tags.

An Unlock should resolve the question generated by the activity, not merely display a definition. Avoid formulations that sound like “the website now tells you the answer.”

The next activity should be locked until the concept has been unlocked if that concept is needed downstream.

## 5. Mission dossier template

The anchor case should be explicit about uncertainty.

### What we know
Only facts necessary to begin reasoning.

### Intentionally unknown
Categories of missing information, without prematurely naming every formal concept students are expected to discover.

### Your job
Observable outputs, e.g.:
- model the system;
- identify constraints;
- justify a decision;
- revise after a changed assumption.

The case should feel underspecified **on purpose**, not accidentally incomplete.

## 6. Scaffolding ladder for difficult technical content

Use this sequence for unfamiliar standards, algorithms, equations or terminology:

1. **Concrete problem** — what needs to happen?
2. **Shape/model** — what kind of structure could solve it?
3. **Family/category** — what class of solution is this?
4. **Named technology/concept** — attach the disciplinary label.
5. **Essential card** — what a novice must retain.
6. **Architecture/mechanism** — what is behind the name.
7. **Technical vocabulary** — optional first exposure.
8. **Advanced layer** — subtle distinctions, standards, edge cases.
9. **Decision/transfer** — use it in a new context.

This is a **fading guidance** pattern: guidance is high at first contact and progressively replaced by learner decisions.

## 7. Gamification grammar

Recommended mechanics because they have an instructional role:

- **Mission / incident / debrief** — narrative coherence.
- **Progressive clues** — controls information load.
- **Commit before reveal** — captures genuine reasoning.
- **Confidence calibration** — supports metacognition.
- **Changed assumption** — tests validity domains.
- **Adaptive depth / Challenge me** — same objective, less assistance, optional and not ranking.
- **Research trail** — prediction → authentic source → reflection on a disciplinary claim.
- **Field Guide unlocks** — visible conceptual progression.
- **v1 → v2 artifact** — visible design progression.

Use sparingly:
- scores;
- streaks;
- badges.

Avoid by default:
- public leaderboards;
- rewards unrelated to learning;
- penalising exploration;
- points for clicking/reading.

## 8. Adaptive depth for heterogeneous prior knowledge

Do not create a second parallel course for fast or experienced learners. Keep one shared mission and add optional depth at selected points.

Use three layers:

**CORE → CHALLENGE → RESEARCH**

### Core
Enough scaffolding for a novice to construct the intended mental model and rejoin the whole-class STOP. Core completeness must never depend on optional depth.

### Challenge me
Target the **same learning objective** with less assistance and a more open transfer/problem-solving task. Do not label learners as experts and do not unlock this only because someone finished quickly. Any learner may opt in.

Recommended mechanic: **Beat the scaffold**.

1. Present the open problem first.
2. Offer Support 1, Support 2, Support 3 progressively.
3. Learners open only the support they need.
4. Display support used, but do not score or rank it.
5. Completion requires a defended response, not clicking every hint.

Important asymmetry: expertise-reversal evidence supports adapting assistance to prior knowledge, but the stronger practical priority is to ensure novices receive sufficient support. Do not weaken the Core route merely to make the advanced route elegant.

### Research trail
Use authentic disciplinary sources only when they help answer a **specific question or controversy**.

Pattern:

**Prediction → source → reconciliation**

- state a claim before the link;
- require a prediction (`agree / disagree / depends`, or equivalent);
- then reveal an official/primary source;
- ask what the source confirmed, nuanced or overturned;
- never use “read this page because you finished early” as the task.

### Selection rule
Use adaptive depth only at high-value conceptual bottlenecks. A typical 90-minute session should have about 3–4 Challenge routes, not one on every screen. Research trails are even scarcer: 2–3 authentic-source tasks are usually enough.

### Invariants

- Fast completion unlocks **intellectual depth, not extra workload**.
- Extensions deepen the current objective; they do not introduce unrelated future-course content.
- Challenge learners rejoin the same STOP as Core learners.
- No public leaderboard for support used.
- Optional depth must be removable without breaking the core story.
- “Fast” and “high prior knowledge” are not assumed to be the same learner characteristic.

## 8. UX / accessibility constraints

- One primary task per screen.
- Short instructions; deeper information collapsible.
- Important context remains accessible without scrolling back through earlier screens.
- Student artifacts are visible at discussion time.
- Color is never the sole state indicator.
- Keyboard focus is visible.
- Touch targets are large enough for phones.
- Avoid mandatory drag-and-drop on mobile.
- Respect reduced-motion preferences.
- Preserve work locally and support explicit export/import when no backend is needed.
- Avoid external assets that can fail in a classroom network unless necessary.

## 9. Course-authoring recipe

For a new course/session:

1. Write **3–5 durable learning outcomes**.
2. Choose **one anchor mission** where all outcomes can matter.
3. Define the **initial artifact** students can create before formal teaching.
4. Identify the concepts that can safely be **discovered before naming**.
5. For each concept, write the STOP quartet: LOOK / COMPARE / CHALLENGE / UNLOCK.
6. Write each UNLOCK as **From your discussion → Formalise it → Carry it forward**, then compress it into a separate Field Guide card.
7. Identify jargon requiring a scaffolding ladder.
8. Create 3–5 transfer cases varying surface features.
9. Add one changed-assumption task that forces artifact revision.
10. Add 3–5 retrieval prompts before the final synthesis.
11. Add Challenge-me routes only where they create deeper reasoning.
12. Audit every screen for premature answers and unnecessary prose.

## 10. Activity specification template

```text
Activity name:
Learning target:
Anchor-case role:
What students know before entering:
Core prompt:
Student artifact:
What must NOT be revealed yet:
Optional scaffold/hint:
Challenge-me route:

STOP
LOOK: artifact shown
COMPARE: one discussion question
CHALLENGE: one counterexample
UNLOCK: student evidence → canonical concept → actionable rule

Transfer case(s):
Later retrieval prompt:
Evidence of learning / revision:
```

## 11. Audit checklist

### Before the activity
- [ ] Does the title or illustration accidentally reveal the conclusion?
- [ ] Is unexplained jargon being used as if it were prior knowledge?
- [ ] Can a novice start the task with what is currently visible?

### During the activity
- [ ] Is the student generating something, not only clicking?
- [ ] Is the current mission/context still accessible?
- [ ] Can a higher-prior-knowledge / fast learner go deeper without blocking others?

### At the STOP
- [ ] Is the group’s own artifact visible?
- [ ] Can students revisit every already unlocked stage?
- [ ] Are future stages still inaccessible from review mode?
- [ ] Are committed/revealed answers preserved rather than silently rewritten?
- [ ] Is there a clear route back to the current mission?
- [ ] Is there a compare question with genuine room for disagreement?
- [ ] Is there one counterexample that tests overgeneralisation?
- [ ] Is there an explicit formalisation after discussion?

### After the STOP
- [ ] Is the unlocked concept available later?
- [ ] Does a later task require using it rather than merely rereading it?

### At the end
- [ ] Did the original artifact change?
- [ ] Is the before/after visible?
- [ ] Is there retrieval before summary?
- [ ] Is there at least one transfer question?

## 12. How to evaluate the pattern in your own teaching

Do not infer effectiveness only from whether students enjoyed the interface.

Collect lightweight evidence across iterations:

- **Concept accuracy at STOPs:** common misconceptions before/after UNLOCK.
- **Transfer success:** percentage of groups applying a concept correctly to a new surface case.
- **Confidence calibration:** confident wrong answers versus low-confidence correct answers.
- **Revision quality:** whether v2 changes address the failed assumption rather than merely add complexity.
- **Retrieval success:** Memory Lock accuracy without reopening the Field Guide.
- **Student workload:** where groups stall, not only where they spend time.
- **Accessibility failures:** mobile interaction, keyboard navigation, readability and external-network dependencies.

For a more rigorous comparison across cohorts, keep the learning outcomes and assessment items stable while changing one instructional mechanism at a time.

---

# Course-level extension

A reusable interactive session should sit inside a lightweight course layer:

**ORIENT → MISSION → RECONNECT**

- **ORIENT:** show the sequence of major design questions and which mission is available, without pre-teaching future answers.
- **MISSION:** run the session-level MACU cycle.
- **RECONNECT:** end by locating the newly formalised capability in the wider course story and expose the next unresolved question.

For multi-session courses, use **soft release** at the course level as well: previous missions remain reviewable, the current mission is open, and future missions are visible as destinations but should not be published until release.

See `COURSE-HUB-AUTHORING.md` for the implementation contract.

## Dual instructor surfaces: Projector + Notes

A session intended to run without slideware should separate two instructor-facing artifacts.

### Projector surface

This is student-facing even though it lives under the instructor path. It must be safe to screen-share at any moment.

For every checkpoint, it should provide a complete public teaching loop:

1. **WORK** — the task, expected artifact and one guardrail to leave visible while groups work;
2. **LOOK** — what students should keep visible from their own work;
3. **COMPARE** — 2–3 questions that surface meaningful differences between groups;
4. **CHALLENGE** — one counterexample or changed assumption;
5. **UNLOCK** — the public consolidation, using **From your discussion → Formalise it → Carry it forward**;
6. **REALITY CHECK** — one concrete artifact, worked calculation, measured/official number, reference architecture or disciplinary source that students interpret after formalisation;
7. **NEXT** — one sentence that creates the need for the next activity.

### Lightweight collective restitution: Live Boards

The Projector may temporarily become the **external memory of the room** during LOOK or COMPARE, but this is not a new public phase. Use at most three reusable representation primitives:

- **Capture** — short ideas, claims or recurring features when the reasoning unit is verbal;
- **Structure** — boxes + labelled flows when relationships, responsibilities or architecture are the reasoning unit;
- **Compare** — a simple tally or categorical distribution when variation between committed group decisions is the reasoning unit.

Choose the representation that matches the task. Do not add a board merely for interactivity. A representation should expose something that prose alone would hide: recurrence, structure, or variation.

For response distributions, follow **commit → aggregate → discuss**. Groups must record their own decision before the class tally is visible; the aggregate describes the room and must not be framed as a correctness signal. The teacher should capture a small number of discriminating responses rather than transcribing the whole discussion.

Live Board invariants:

- no backend, student accounts or device polling is required; the instructor enters the collective response;
- the board lives inside the existing LOOK/COMPARE screen, so it creates no additional navigation transition;
- Capture is not a word cloud: frequency is not treated as semantic importance;
- Structure is a collective model, not a hidden reference answer;
- Compare is a discussion trigger, not an assessment result;
- preserve the student artifact as primary evidence; the collective board supplements rather than replaces it;
- omit the board when the student artifacts themselves are already easy to compare.

The Reality Check is not mandatory filler and is not a mini-lecture. Use it when a concrete external or worked artifact can answer a question created by the preceding reasoning. Prefer **one strong piece of evidence + one interpretation question** over a dense fact slide. Use a second Reality Check only when one evidence screen would become too dense or when two genuinely different evidence types must be interpreted separately. Clearly label worked assumptions, distinguish measured values from illustrative calculations, and link official sources when technical numbers are shown.

Projector invariants:

- large, sparse, high-contrast typography;
- progressive reveal rather than a dense all-at-once slide;
- no teaching-method commentary, GitHub/publication details, answer-key language, or authoring notes;
- no private cues such as “do not tell students…”;
- the projected challenge must be discussable before its formalisation is shown;
- the public sequence must not end at abstraction: when useful, a Reality Check should connect the concept to a concrete system, output, calculation or authoritative technical fact;
- the final public screen should contain either the concrete evidence students should be able to interpret or the concept they are expected to retain.

### Private instructor notes

The private surface should make slide preparation unnecessary. For each checkpoint it should contain:

- what to listen for in student answers;
- what counts as a defensible answer;
- what must be corrected or nuanced;
- common misconceptions;
- an optional prompt if the room is quiet;
- the precise concept to land on;
- the transition sentence;
- technical precision that may be needed in follow-up questions.

The two surfaces should contain the **same conceptual destination** but different information density.

> **The class sees the intellectual problem and its consolidation. The instructor sees the facilitation logic and answer space.**

This separation is especially important in a no-slides course: projector pages replace both the **work prompt** and the **public explanatory/evidence function** of slides, while notes replace presenter notes. The default public rhythm is **WORK → LOOK → COMPARE → CHALLENGE → UNLOCK → REALITY CHECK**.

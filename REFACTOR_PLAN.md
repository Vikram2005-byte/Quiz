# Quiz App Refactor Playbook (for a new contributor)

If you’re opening this repo for the first time, this is the safest way to improve the code without breaking behavior.

The idea is simple: **small changes, frequent checks, clean commits**.

---

## What this refactor is trying to fix

Right now the app works, but logic and UI updates are mixed together in a few places. That makes future features (progress bar, shuffling, saved scores) harder than they should be.

This playbook helps you:
- keep current behavior exactly the same,
- make the code easier to read,
- reduce repeated code,
- avoid timer bugs.

---

## Before you start

1. Run the app in the browser once so you know the baseline behavior.
2. Keep each step in a separate commit.
3. After every step, manually test:
   - app starts,
   - answer selection works,
   - timer counts down,
   - next question works,
   - results screen appears,
   - restart works.

If a step causes confusion, stop there and commit the stable state.

---

## Step 1 — Clean up naming and add intent comments

**Goal:** make the file easier to scan.

- Rename ambiguous locals like `question` to `currentQuestion` where it improves clarity.
- Add short comments above the key functions so readers know responsibility quickly.
- Keep this step behavior-neutral.

**Suggested commit message:**
`chore: clarify naming and document function responsibilities`

---

## Step 2 — Separate display updates from logic

**Goal:** stop sprinkling direct DOM writes everywhere.

Create tiny render helpers:
- `renderScore()`
- `renderTimer()`

Then replace direct assignments (`scoreEl.textContent = ...`, `timerEl.textContent = ...`) with those helpers.

**Why this matters:** once render paths are centralized, UI changes become safer.

**Suggested commit message:**
`refactor: extract score and timer render helpers`

---

## Step 3 — Extract repeated UI actions

**Goal:** remove duplication.

Add small helpers such as:
- `disableAllOptions()`
- `resetFeedback()`

Use them in answer handling, timeout handling, and question loading.

**Suggested commit message:**
`refactor: extract shared option and feedback helpers`

---

## Step 4 — Centralize question loading

**Goal:** have one reliable path for moving to a question.

Create `loadQuestion(index)` that handles:
- index check,
- question text rendering,
- option button creation,
- per-question UI reset.

Call it from both `startQuiz()` and `nextQuestion()`.

**Suggested commit message:**
`refactor: centralize question loading flow`

---

## Step 5 — Put mutable values into one state object

**Goal:** reduce scattered globals.

Move mutable values into one object:
- `state.currentQuestionIndex`
- `state.score`
- `state.timeLeft`
- `state.timerId`

This makes state transitions easier to reason about and debug.

**Suggested commit message:**
`refactor: consolidate quiz mutable state`

---

## Step 6 — Make timer lifecycle explicit

**Goal:** avoid duplicate intervals and edge-case leaks.

Add:
- `startQuestionTimer()`
- `stopQuestionTimer()`

Rules:
- always stop old timer before starting a new one,
- stop timer on answer selection,
- stop timer before showing results.

**Suggested commit message:**
`refactor: make per-question timer lifecycle explicit`

---

## Step 7 — Add lightweight question validation

**Goal:** fail gracefully if question data is malformed.

Add `isValidQuestion(item)` and a startup check for the questions array.
If validation fails:
- show a friendly message in the quiz container,
- skip starting the quiz loop.

**Suggested commit message:**
`feat: validate question schema on startup`

---

## Step 8 — Good follow-up features (after refactor)

Once steps 1–7 are stable, pick one:
- progress label (`Question X of N`),
- shuffle questions/options,
- best score with `localStorage`,
- keyboard support for accessibility.

Do these one at a time.

---

## Practical checklist (copy this into PRs)

- [ ] No behavior change unless intended.
- [ ] No duplicate timers running.
- [ ] Options disabled after answer or timeout.
- [ ] Restart fully resets state and UI.
- [ ] Manual test completed end-to-end.

---

## If you get stuck

Don’t force a giant rewrite. Revert to the last clean commit and continue in smaller slices. In this project, tiny wins are the fastest path forward.

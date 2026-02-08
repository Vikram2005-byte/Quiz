# Beginner-Friendly Refactor Plan

This plan keeps each step small and safe so a newcomer can practice one concept at a time.

## Goals
- Make the quiz logic easier to read and extend.
- Reduce hidden coupling between UI updates and state changes.
- Prepare for future features (progress UI, question randomization, persistent high score).

## Ground Rules
- Keep behavior identical after each step.
- Commit after each completed step.
- Verify quiz flow manually after each step: start -> answer -> next -> results -> restart.

## Step 1: Clarify Names and Intent (No behavior change)
- Rename vague variables to clearer names where helpful (e.g., `question` local vars to `currentQuestion`).
- Add short comments above core functions (`startQuiz`, `showQuestion`, `selectAnswer`, `nextQuestion`, `showResults`).
- Ensure constants and mutable state are visually separated in `script.js`.

**Why first:** easiest changes with low risk, helps new contributors read the code.

## Step 2: Isolate Rendering from State Updates
- Create a small helper `renderScore()` that only writes score to the DOM.
- Create `renderTimer()` that only writes time to the DOM.
- Replace direct DOM writes with helper calls.

**Why:** teaches separation of concerns and makes it easier to test logic later.

## Step 3: Add Single-Purpose Helpers for Quiz Actions
- Extract `disableOptions()` and `clearFeedback()` helpers.
- Use these helpers in `selectAnswer`, timer timeout handling, and `showQuestion`.

**Why:** removes repeated DOM code and prevents inconsistencies.

## Step 4: Centralize Question Lifecycle
- Add a `loadQuestion(index)` function that:
  - validates index,
  - renders question/options,
  - resets per-question feedback state.
- Have `startQuiz` and `nextQuestion` both call it.

**Why:** one entry point for question transitions reduces bugs.

## Step 5: Introduce a Small State Object
- Replace scattered globals with one object:
  - `state.currentQuestionIndex`
  - `state.score`
  - `state.timeLeft`
  - `state.timerId`
- Update functions to read/write through `state`.

**Why:** easier mental model and easier future migration to framework/state machine.

## Step 6: Make Timer Lifecycle Explicit
- Add `startQuestionTimer()` and `stopQuestionTimer()`.
- Ensure every path that ends a question calls `stopQuestionTimer()`.
- Guard against duplicate intervals.

**Why:** timer bugs are common; explicit lifecycle avoids leaks.

## Step 7: Add Lightweight Validation Utilities
- Add `isValidQuestion(question)` and optional startup validation for the `questions` array.
- If invalid data is found, show a user-friendly message in the quiz container.

**Why:** prepares for future external question sources (JSON/API).

## Step 8: Optional Next Features (After refactor)
- Progress indicator (`Question X of N`).
- Shuffle questions/options.
- Persist best score in `localStorage`.
- Add keyboard accessibility for option selection.

## Suggested Commit Sequence
1. chore: clarify naming and add function comments
2. refactor: extract render helpers for score and timer
3. refactor: extract option/feedback helpers
4. refactor: centralize question loading
5. refactor: move mutable globals into state object
6. refactor: make timer lifecycle explicit
7. feat: add question schema validation with friendly error UI

## Manual Test Checklist
- App loads first question and timer starts.
- Correct answer increments score and shows positive feedback.
- Incorrect answer shows correct option.
- Options disable after an answer.
- Time-out disables options and shows time-up message.
- Next advances until results appear.
- Restart resets score, timer, and question index.

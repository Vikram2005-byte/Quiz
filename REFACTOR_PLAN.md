# Beginner-Friendly Quiz Refactor Plan

This document is a practical, step-by-step guide to improving the existing quiz app without making a large rewrite. Each step should be implemented, reviewed, and tested before moving on.

## Current App Structure

- `index.html` — quiz interface and element IDs.
- `styles.css` — page and answer-option styling.
- `script.js` — question data, timer, answer checking, score, navigation, and restart behavior.

The app currently has four sample questions and a 60-second timer for each question. It runs entirely in the browser; there is no backend or API.

## Ground Rules

- Make one small change per commit.
- Keep the current behavior unless a step explicitly fixes a bug.
- Test the full quiz flow after every change: start → answer or timeout → next question → results → restart.
- Do not start the next step until the current step passes its checks.
- Update this plan if the implementation changes.

## Step 1: Clarify Names and Intent

**Goal:** make the existing code easier to read without changing behavior.

- Rename local variables such as `question` to `currentQuestion` where that improves clarity.
- Add brief comments explaining each main function.
- Separate question data, state variables, DOM references, and event listeners into clear sections.

**Check:** the page still loads, answer feedback is correct, and the score is unchanged for the same answers.

Suggested commit: `chore: clarify quiz naming and function intent`

## Step 2: Centralize Score and Timer Rendering

**Goal:** keep DOM updates consistent.

- Add `renderScore()` to update the score display.
- Add `renderTimer()` to update the countdown display.
- Call these helpers rather than writing to the score and timer elements in multiple places.

**Check:** score updates only after a correct answer, and the countdown display matches the timer state.

Suggested commit: `refactor: centralize score and timer rendering`

## Step 3: Extract Reusable UI Helpers

**Goal:** reduce repeated DOM manipulation.

- Use a single `disableOptions()` helper after an answer and after timeout.
- Add a `clearFeedback()` helper and use it when loading a new question.
- Make sure selecting an answer a second time cannot increase the score again.

**Check:** options become disabled after answering or timeout, and feedback clears on the next question.

Suggested commit: `refactor: extract option and feedback helpers`

## Step 4: Centralize Question Loading

**Goal:** have one reliable path for displaying a question.

- Add `loadQuestion(index)` to validate the index, display the question and options, reset feedback, and reset answer state.
- Use it from both quiz start and next-question logic.
- Show results when the requested index is beyond the final question.

**Check:** the first and last questions behave correctly, and results appear once after the final question.

Suggested commit: `refactor: centralize question loading`

## Step 5: Group Mutable State

**Goal:** make related quiz state easier to understand.

Consider grouping these values into one object:

- `currentQuestionIndex`
- `score`
- `timeLeft`
- `timerId`
- `answered`

Keep question data and DOM references separate; they do not need to be put into the state object.

**Check:** restarting always resets the question index, score, timer, and answer state.

Suggested commit: `refactor: group mutable quiz state`

## Step 6: Make Timer Lifecycle Explicit

**Goal:** avoid overlapping or stale countdown intervals.

- Use `startQuestionTimer()` and `stopQuestionTimer()`.
- Stop the timer before starting a new one.
- Stop it immediately after an answer, on timeout, before displaying results, and before restarting.
- Do not allow the Next Question button to skip an unanswered question. When time expires, allow the user to continue.

**Check:** wait for timeout, answer early, restart during a question, and verify only one countdown is active.

Suggested commit: `fix: make quiz timer lifecycle reliable`

## Step 7: Validate Question Data

**Goal:** handle malformed question data safely.

- Add `isValidQuestion(question)` to check that the prompt is text, options are a non-empty array of strings, and `correct` is a valid option index.
- Validate the full questions array before starting.
- If validation fails, show a friendly message in the quiz container instead of starting a broken quiz.

**Check:** valid questions start normally; deliberately malformed test data displays the friendly error.

Suggested commit: `feat: validate quiz question data`

## Step 8: Optional Improvements

Only after the core quiz flow is stable, consider one feature at a time:

- Progress indicator, such as “Question 2 of 4”.
- Shuffle questions or answer options.
- Store a best score in `localStorage`.
- Improve keyboard navigation and focus visibility.

**Check:** each added feature works on desktop and mobile without breaking scoring, timing, or restart.

## Manual Test Checklist

- [ ] The first question appears and the timer starts at 60.
- [ ] A correct answer increments the score exactly once.
- [ ] An incorrect answer displays the correct answer.
- [ ] Answer options disable after a selection.
- [ ] Timeout stops the timer, disables options, and displays a time-up message.
- [ ] Next Question cannot skip an unanswered question before timeout.
- [ ] Each new question starts a fresh 60-second timer.
- [ ] Results display after the last question.
- [ ] Restart resets score, timer, question index, feedback, and options.
- [ ] No duplicate timers run after repeated restarts.

## Scope and Limitations

This plan covers the current static browser app. It does not imply that a backend, external question API, user accounts, or cross-device score syncing exist. Add those only as separate, explicitly scoped projects.

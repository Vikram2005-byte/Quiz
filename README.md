# Quiz App

A short multiple-choice quiz with a countdown for each question. There are four general-knowledge questions in the current question bank; after the last one, you'll see your final score.

## Play online

[**Open the quiz**](https://quiz-tawny-nine.vercel.app/)

## How it works

- Each question has 60 seconds.
- The app lets you know whether your answer was correct and highlights the correct choice.
- Once you answer or the timer runs out, the options are locked for that question.
- A progress label shows which question you're on.
- At the end, you get a score out of four and can restart the quiz.

The included questions are examples, not a large question bank.

## Run it locally

Download the repository using **Code → Download ZIP** and extract it, or clone it:

    git clone https://github.com/Vikram2005-byte/Quiz.git

Open `index.html` in a modern browser.

If you prefer a local server, run this command from the project folder:

    python -m http.server 8000

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000). Keep the terminal running while the quiz is open.

## Change the questions

Open `script.js` and edit the `questions` array near the top. Each entry contains the question text, four options, and the index of the correct option (the first option is index `0`).

## Project files

- `index.html` — quiz screen, progress, timer, and result view
- `styles.css` — layout, responsive styling, and answer feedback
- `script.js` — question data, timer, scoring, feedback, and restart logic

The quiz runs entirely in the browser. Scores are not submitted to a server or stored in an online account.

# Quiz App

A small multiple-choice quiz with a countdown for each question. The current version has four sample questions and shows your score at the end.

## How it works

- You get 60 seconds to answer each question.
- The app tells you whether your answer was correct and shows the right answer when it wasn't.
- Once you answer or the timer runs out, the options are locked.
- Move through the questions, see your final score, and restart for another round.

The included questions are examples, not a large question bank.

## Run it locally

1. Download the repository using **Code → Download ZIP** and extract it, or clone it:

       git clone https://github.com/Vikram2005-byte/Quiz.git

2. Open `index.html` in a modern browser.

If you'd rather use a local server, run this command from the project folder:

       python -m http.server 8000

Then open [http://127.0.0.1:8000](http://127.0.0.1:8000). Leave the terminal running while the quiz is open.

## Change the questions

Open `script.js` and edit the `questions` array near the top. Each question has its text, four options, and the index of the correct option (the first option is index `0`).

## Project files

- `index.html` — quiz screen and result view
- `styles.css` — page styling
- `script.js` — question data, timer, answer feedback, scoring, and restart logic

The quiz is entirely client-side. Scores are not submitted to a server or saved as an online account.

// A small four-question quiz. The question bank can be edited below.
const questions = [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "Who wrote Romeo and Juliet?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 },
];

const QUESTION_TIME_SECONDS = 60;

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = QUESTION_TIME_SECONDS;
let timer = null;
let answered = false;

const questionEl = document.getElementById("question");
const progressEl = document.getElementById("question-progress");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time-left");
const scoreEl = document.getElementById("current-score");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const quizContent = document.getElementById("quiz-content");
const resultsEl = document.getElementById("results");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    stopTimer();
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = QUESTION_TIME_SECONDS;

    scoreEl.textContent = String(score);
    timerEl.textContent = String(timeLeft);
    document.getElementById("timer").classList.remove("time-low");
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    quizContent.hidden = false;
    resultsEl.hidden = true;

    showQuestion();
    startTimer();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    answered = false;

    progressEl.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionEl.textContent = currentQuestion.question;
    optionsEl.replaceChildren();
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
    nextBtn.disabled = true;
    nextBtn.textContent = currentQuestionIndex === questions.length - 1
        ? "View results"
        : "Next question";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.className = "option";
        button.dataset.index = String(index);
        button.setAttribute("aria-pressed", "false");
        button.addEventListener("click", selectAnswer);
        optionsEl.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answered) return;

    const selectedIndex = Number(event.currentTarget.dataset.index);
    const currentQuestion = questions[currentQuestionIndex];
    answered = true;
    stopTimer();

    optionsEl.querySelectorAll(".option").forEach((button) => {
        const optionIndex = Number(button.dataset.index);
        button.disabled = true;

        if (optionIndex === currentQuestion.correct) {
            button.classList.add("correct");
        }
        if (optionIndex === selectedIndex) {
            button.setAttribute("aria-pressed", "true");
            if (selectedIndex !== currentQuestion.correct) {
                button.classList.add("incorrect");
            }
        }
    });

    if (selectedIndex === currentQuestion.correct) {
        score += 1;
        feedbackEl.textContent = "Correct — nice work.";
        feedbackEl.classList.add("feedback-correct");
    } else {
        feedbackEl.textContent = `Not quite. The correct answer is ${currentQuestion.options[currentQuestion.correct]}.`;
        feedbackEl.classList.add("feedback-incorrect");
    }

    scoreEl.textContent = String(score);
    nextBtn.disabled = false;
}

function startTimer() {
    stopTimer();
    timer = window.setInterval(() => {
        timeLeft = Math.max(0, timeLeft - 1);
        timerEl.textContent = String(timeLeft);

        const timerContainer = document.getElementById("timer");
        timerContainer.classList.toggle("time-low", timeLeft <= 10);

        if (timeLeft === 0) {
            stopTimer();
            answered = true;
            feedbackEl.textContent = `Time's up. The correct answer is ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].correct]}.`;
            feedbackEl.classList.add("feedback-incorrect");
            revealCorrectAnswer();
            nextBtn.disabled = false;
        }
    }, 1000);
}

function revealCorrectAnswer() {
    const correctIndex = questions[currentQuestionIndex].correct;
    optionsEl.querySelectorAll(".option").forEach((button) => {
        button.disabled = true;
        if (Number(button.dataset.index) === correctIndex) {
            button.classList.add("correct");
        }
    });
}

function stopTimer() {
    if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
    }
}

function nextQuestion() {
    if (nextBtn.disabled || answered === false) return;

    stopTimer();
    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
        timeLeft = QUESTION_TIME_SECONDS;
        timerEl.textContent = String(timeLeft);
        document.getElementById("timer").classList.remove("time-low");
        showQuestion();
        startTimer();
    } else {
        showResults();
    }
}

function showResults() {
    stopTimer();
    quizContent.hidden = true;
    resultsEl.hidden = false;
    finalScoreEl.textContent = `You got ${score} out of ${questions.length} questions right.`;
    restartBtn.focus();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);

startQuiz();

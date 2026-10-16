// Quiz data
const questions = [
    { question: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
    { question: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correct: 1 },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], correct: 1 },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], correct: 1 }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer = null;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("time-left");
const scoreEl = document.getElementById("current-score");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultsEl = document.getElementById("results");
const finalScoreEl = document.getElementById("final-score");
const restartBtn = document.getElementById("restart-btn");

function startQuiz() {
    stopTimer();
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    scoreEl.textContent = String(score);
    timerEl.textContent = String(timeLeft);
    feedbackEl.textContent = "";
    feedbackEl.style.color = "";
    resultsEl.style.display = "none";
    nextBtn.style.display = "inline-block";
    showQuestion();
    startTimer();
}

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    answered = false;
    nextBtn.disabled = true;
    questionEl.textContent = currentQuestion.question;
    optionsEl.replaceChildren();

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = option;
        button.className = "option";
        button.dataset.index = String(index);
        button.addEventListener("click", selectAnswer);
        optionsEl.appendChild(button);
    });

    feedbackEl.textContent = "";
    feedbackEl.style.color = "";
}

function selectAnswer(event) {
    if (answered) return;

    const selectedIndex = Number(event.currentTarget.dataset.index);
    const currentQuestion = questions[currentQuestionIndex];
    answered = true;
    stopTimer();

    if (selectedIndex === currentQuestion.correct) {
        score += 1;
        feedbackEl.textContent = "Correct!";
        feedbackEl.style.color = "green";
    } else {
        feedbackEl.textContent = `Incorrect. The correct answer is: ${currentQuestion.options[currentQuestion.correct]}`;
        feedbackEl.style.color = "red";
    }

    scoreEl.textContent = String(score);
    disableOptions();
    nextBtn.disabled = false;
}

function disableOptions() {
    optionsEl.querySelectorAll(".option").forEach((button) => {
        button.disabled = true;
    });
}

function startTimer() {
    stopTimer();
    timer = setInterval(() => {
        timeLeft = Math.max(0, timeLeft - 1);
        timerEl.textContent = String(timeLeft);

        if (timeLeft === 0) {
            stopTimer();
            answered = true;
            feedbackEl.textContent = "Time's up!";
            feedbackEl.style.color = "orange";
            disableOptions();
            nextBtn.disabled = false;
        }
    }, 1000);
}

function stopTimer() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function nextQuestion() {
    if (nextBtn.disabled || currentQuestionIndex >= questions.length) return;

    stopTimer();
    currentQuestionIndex += 1;

    if (currentQuestionIndex < questions.length) {
        timeLeft = 60;
        timerEl.textContent = String(timeLeft);
        showQuestion();
        startTimer();
    } else {
        showResults();
    }
}

function showResults() {
    stopTimer();
    nextBtn.style.display = "none";
    resultsEl.style.display = "block";
    finalScoreEl.textContent = `Your final score is ${score} out of ${questions.length}`;
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
startQuiz();

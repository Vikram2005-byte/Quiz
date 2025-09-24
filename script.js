// Quiz data
const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timer;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const timerEl = document.getElementById('time-left');
const scoreEl = document.getElementById('current-score');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const resultsEl = document.getElementById('results');
const finalScoreEl = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 60;
    resultsEl.style.display = 'none';
    nextBtn.style.display = 'block';
    showQuestion();
    startTimer();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.dataset.index = index;
        button.addEventListener('click', selectAnswer);
        optionsEl.appendChild(button);
    });
    feedbackEl.textContent = '';
}

function selectAnswer(e) {
    const selectedIndex = parseInt(e.target.dataset.index);
    const question = questions[currentQuestionIndex];
    if (selectedIndex === question.correct) {
        score++;
        feedbackEl.textContent = 'Correct!';
        feedbackEl.style.color = 'green';
    } else {
        feedbackEl.textContent = `Incorrect. The correct answer is: ${question.options[question.correct]}`;
        feedbackEl.style.color = 'red';
    }
    scoreEl.textContent = score;
    // Disable options after selection
    document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
    clearInterval(timer);
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            feedbackEl.textContent = 'Time\'s up!';
            feedbackEl.style.color = 'orange';
            document.querySelectorAll('.option').forEach(btn => btn.disabled = true);
        }
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        timeLeft = 60;
        showQuestion();
        startTimer();
    } else {
        showResults();
    }
}

function showResults() {
    clearInterval(timer);
    nextBtn.style.display = 'none';
    resultsEl.style.display = 'block';
    finalScoreEl.textContent = `Your final score is ${score} out of ${questions.length}`;
}

function restartQuiz() {
    startQuiz();
}

nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Start the quiz when the page loads
startQuiz();

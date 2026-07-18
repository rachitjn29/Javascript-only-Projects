const startBtn = document.querySelector(".start_btn");
const startScreen = document.querySelector(".start-screen");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const questionText = document.querySelector(".que_text");
const optionList = document.querySelector(".option_list");
const nextBtn = document.querySelector(".next_btn");
const totalQue = document.querySelector(".total_que");
const questionCount = document.querySelector(".question-count");
const timerText = document.querySelector(".timer_text");
const scoreText = document.querySelector(".score_text");
const restartBtn = document.querySelector(".restart");
const quitBtn = document.querySelector(".quit");
const timeLine = document.querySelector(".time_line");

let index = 0;
let score = 0;
let time = 15;
let timer;
let line;
let autoNext;
let answered = false;

startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    quizBox.style.display = "block";
    loadQuestion();
});

function loadQuestion() {

    clearTimeout(autoNext);
    clearInterval(timer);
    clearInterval(line);
    answered = false;

    time = 15;
    timerText.textContent = "15s";
    timerText.classList.remove("time-over");

    timeLine.style.width = "0%";

    questionCount.textContent = `${index + 1} / ${questions.length}`;
    totalQue.textContent = `Question ${index + 1} of ${questions.length}`;

    nextBtn.classList.remove("show");

    const q = questions[index];

    questionText.textContent = q.question;

    optionList.innerHTML = "";

    q.options.forEach(option => {
        const div = document.createElement("div");
        div.className = "option";
        div.textContent = option;

        div.addEventListener("click", () => {
            selectOption(div, option);
        });

        optionList.appendChild(div);
    });
    timeLine.style.transition = "none";
    timeLine.style.width = "0%";

    void timeLine.offsetWidth; // force reflow

    requestAnimationFrame(() => {
        timeLine.style.transition = "width 15s linear";
        timeLine.style.width = "100%";
    });

    startTimer();
}

function selectOption(element, selected) {
    clearTimeout(autoNext);
    answered = true;
    clearInterval(timer);

    timeLine.style.width = getComputedStyle(timeLine).width;
    timeLine.style.transition = "none";

    const correct = questions[index].answer;
    const options = document.querySelectorAll(".option");
    options.forEach(option => {
        option.classList.add("disabled");
        if (option.textContent === correct) {
            option.classList.add("correct");
        }
    });

    if (selected === correct) {
        score++;
    } else {
        element.classList.add("incorrect");
    }
    nextBtn.classList.add("show");
    autoNext = setTimeout(() => {

        index++;

        if (index < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }

    }, 2000);
}


nextBtn.addEventListener("click", () => {

    clearTimeout(autoNext);

    index++;

    if (index < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }

});

function showResult() {
    quizBox.style.display = "none";
    resultBox.style.display = "block";

    const percentage = Math.round((score / questions.length) * 100);

    let message = "Keep Practicing 💪";

    if (percentage >= 90) {
        message = "Excellent 🎉";
    } else if (percentage >= 70) {
        message = "Great Job 👏";
    } else if (percentage >= 50) {
        message = "Good Effort 👍";
    }

    scoreText.innerHTML = `
<h3>${message}</h3>
<p>${score} / ${questions.length}</p>
<p>${percentage}% Accuracy</p>
`;
}

restartBtn.addEventListener("click", () => {
    index = 0;
    score = 0;

    resultBox.style.display = "none";
    quizBox.style.display = "block";

    loadQuestion();
});

quitBtn.addEventListener("click", () => {
    index = 0;
    score = 0;

    resultBox.style.display = "none";
    startScreen.style.display = "block";
});

function startTimer() {

    timer = setInterval(() => {

        time--;
        timerText.textContent = `${time}s`;

        if (time <= 0) {

            clearInterval(timer);
            clearInterval(line);

            if (answered) return;

            timerText.textContent = "Time Over!";
            timerText.classList.add("time-over");

            const correct = questions[index].answer;
            const options = document.querySelectorAll(".option");

            options.forEach(option => {
                option.classList.add("disabled");

                if (option.textContent === correct) {
                    option.classList.add("correct");
                }
            });

            nextBtn.classList.add("show");

            autoNext = setTimeout(() => {

                if (index < questions.length - 1) {
                    index++;
                    loadQuestion();
                } else {
                    showResult();
                }

            }, 2000);

        }

    }, 1000);

}

const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const milliseconds = document.getElementById("milliseconds");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const clearBtn = document.getElementById("clearBtn");

const lapList = document.getElementById("lapList");
const status = document.querySelector(".status");

let hr = 0;
let min = 0;
let sec = 0;
let ms = 0;

let timer = null;
let running = false;
let lapTimes = [];

pauseBtn.disabled = true;
lapBtn.disabled = true;
resetBtn.disabled = true;

function format(num) {
    return String(num).padStart(2, "0");
}

function changeStatus(text, color) {
    status.textContent = text;
    status.style.background = color;
}

function updateDisplay() {
    hours.textContent = format(hr);
    minutes.textContent = format(min);
    seconds.textContent = format(sec);
    milliseconds.textContent = format(ms);
}

startBtn.addEventListener("click", () => {
    if (running) return;
    running = true;
    timer = setInterval(() => {
        ms++;
        if (ms === 100) {
            ms = 0;
            sec++;
        }
        if (sec === 60) {
            sec = 0;
            min++;
        }
        if (min === 60) {
            min = 0;
            hr++;
        }
        updateDisplay();
    }, 10);
    changeStatus("Running", "#16a34a");
    startBtn.textContent = "Resume";
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
    resetBtn.disabled = false;
});

pauseBtn.addEventListener("click", () => {
    if (!running) return;
    running = false;
    clearInterval(timer);
    changeStatus("Paused", "#f59e0b");
    startBtn.disabled = false;
    pauseBtn.disabled = true;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    running = false;
    hr = 0;
    min = 0;
    sec = 0;
    ms = 0;

    updateDisplay();

    lapTimes = [];
    lapList.innerHTML = "";

    changeStatus("Ready", "#334155");

    startBtn.textContent = "Start";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
    resetBtn.disabled = true;
});

lapBtn.addEventListener("click", () => {
    lapTimes.push({ hr, min, sec, ms
    });
    renderLaps();
});

clearBtn.addEventListener("click", () => {
    lapTimes = [];
    lapList.innerHTML = "";
});

function renderLaps() {
    lapList.innerHTML = "";
    for (let i = lapTimes.length - 1; i >= 0; i--) {
        const lap = lapTimes[i];
        const li = document.createElement("li");
        li.innerHTML = `
            <span>Lap ${i + 1}</span>
            <span>${format(lap.hr)}:${format(lap.min)}:${format(lap.sec)}.${format(lap.ms)}</span>`;
        lapList.appendChild(li);
    }
}
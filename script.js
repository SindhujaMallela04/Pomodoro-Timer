let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');

function updateTimerDisplay() {
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    let workDuration = parseInt(workDurationInput.value) || 25;
    let breakDuration = parseInt(breakDurationInput.value) || 5;
    minutes = workDuration;
    seconds = 0;

    timer = setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                if (confirm('Time\'s up! Start break?')) {
                    minutes = breakDuration;
                    seconds = 0;
                } else {
                    clearInterval(timer);
                    isRunning = false;
                }
            } else {
                minutes--;
                seconds = 59;
            }
        } else {
            seconds--;
        }
        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = parseInt(workDurationInput.value) || 25;
    seconds = 0;
    updateTimerDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay();

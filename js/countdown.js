const secondsDisplay = document.querySelector('.clock__sec');
const minutesDisplay = document.querySelector('.clock__min');
const hoursDisplay = document.querySelector('.clock__hours');
const startButton = document.querySelector('.button__play-pause');
const resetButton = document.querySelector('.button__reset');
const inputHours = document.getElementById('hours-timer-input');
const inputMinutes = document.getElementById('min-timer-input');
const inputSeconds = document.getElementById('sec-timer-input');
const message = document.getElementById('message');

let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
const intervalTime = 1000; // 1000 ms = 1s
let intervalId;

const timeInput = document.querySelector('#timeInput');

startButton.addEventListener('click', toggleChronometer);
resetButton.addEventListener('click', reset);

// Representar los inputs
inputHours.addEventListener('change', (event) => {
    hours = event.target.value;
    updateDisplay();
});
inputMinutes.addEventListener('change', (event) => {
    minutes = event.target.value;
    updateDisplay();
});
inputSeconds.addEventListener('change', (event) => {
    seconds = event.target.value;
    updateDisplay();
});

function toggleChronometer() {
    if (!isRunning) {
        intervalId = setInterval(count, intervalTime);
        isRunning = true;
        document.querySelector('button').innerHTML = 'Pause';
    } else {
        clearInterval(intervalId);
        isRunning = false;
        document.querySelector('button').innerHTML = 'Play';
    }
}
function count() {
    seconds--;
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);

    // end
    if (hours === 0 && minutes === 0 && seconds < 0) {
        clearInterval(intervalId);
        isRunning = false;
        document.querySelector('button').innerHTML = 'Play';
        message.innerHTML = 'Time is up!';
        return;
    }
    // minutes less
    if (seconds < 0) {
        seconds = 59;
        if (minutes > 0) {
            minutes--;
        } else if (hours > 0) {
            minutes = 59;
            hours--;
        }
    }
}
function updateDisplay() {
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);
}
function formatTime(time) {
    return time < 10 ? '0' + time : time;
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    seconds = minutes = hours = 0;
    startButton.innerHTML = 'Start';
    message.innerHTML = '';
    updateDisplay();
    if (isRunning) {
        toggleChronometer();
    }
}

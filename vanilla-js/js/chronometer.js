import { formatTime, calculateTimeFromCentiseconds } from './utils.js';

const centisecondsDisplay = document.querySelector('.clock__centisec');
const secondsDisplay = document.querySelector('.clock__sec');
const minutesDisplay = document.querySelector('.clock__min');
const hoursDisplay = document.querySelector('.clock__hours');
const startButton = document.querySelector('.button__play-pause');
const resetButton = document.querySelector('.button__reset');

let totalCentiseconds = 0;
let isRunning = false;
let intervalId;

startButton.addEventListener('click', toggleChronometer);
resetButton.addEventListener('click', reset);

function toggleChronometer() {
    if (!isRunning) {
        intervalId = setInterval(count, 10);
        isRunning = true;
        document.querySelector('button').innerHTML = 'Pause';
    } else {
        clearInterval(intervalId);
        isRunning = false;
        document.querySelector('button').innerHTML = 'Play';
    }
}
function count() {
    const time = calculateTimeFromCentiseconds(totalCentiseconds);
    centisecondsDisplay.innerHTML = formatTime(time.centiseconds);
    secondsDisplay.innerHTML = formatTime(time.seconds);
    minutesDisplay.innerHTML = formatTime(time.minutes);
    hoursDisplay.innerHTML = formatTime(time.hours);

    totalCentiseconds++;
}
// WARN: No pasa de milliseconds
function updateDisplay() {
    centisecondsDisplay.innerHTML = formatTime(totalCentiseconds);
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    totalCentiseconds = 0;
    startButton.innerHTML = 'Start';
    updateDisplay();
    if (isRunning) {
        toggleChronometer();
    }
}

import { formatTime, increaseTime } from './utils.js';

const millisecondsDisplay = document.querySelector('.clock__millisec');
const secondsDisplay = document.querySelector('.clock__sec');
const minutesDisplay = document.querySelector('.clock__min');
const hoursDisplay = document.querySelector('.clock__hours');
const startButton = document.querySelector('.button__play-pause');
const resetButton = document.querySelector('.button__reset');

let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
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
    milliseconds++;
    millisecondsDisplay.innerHTML = formatTime(milliseconds);
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);

    const updatedTime = increaseTime({ milliseconds, seconds, minutes, hours });
    milliseconds = updatedTime.milliseconds;
    seconds = updatedTime.seconds;
    minutes = updatedTime.minutes;
    hours = updatedTime.hours;
}
function updateDisplay() {
    millisecondsDisplay.innerHTML = formatTime(milliseconds);
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    milliseconds = seconds = minutes = hours = 0;
    startButton.innerHTML = 'Start';
    updateDisplay();
    if (isRunning) {
        toggleChronometer();
    }
}

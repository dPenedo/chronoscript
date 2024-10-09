import {
    formatTime,
    timeIsInvalid,
    calculateTimeFromMilliseconds,
} from './utils.js';

const secondsDisplay = document.querySelector('.clock__sec');
const minutesDisplay = document.querySelector('.clock__min');
const hoursDisplay = document.querySelector('.clock__hours');
const startButton = document.querySelector('.button__play-pause');
const resetButton = document.querySelector('.button__reset');
const inputHours = document.getElementById('hours-timer-input');
const inputMinutes = document.getElementById('min-timer-input');
const inputSeconds = document.getElementById('sec-timer-input');
const message = document.getElementById('message');

let totalSeconds = 0;
let isRunning = false;
const intervalTime = 1000;
let intervalId;

const clearInputFields = () => {
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';
};

const updateDisplay = () => {
    const time = calculateTimeFromMilliseconds(totalSeconds * 1000);
    secondsDisplay.innerHTML = formatTime(time.seconds);
    minutesDisplay.innerHTML = formatTime(time.minutes);
    hoursDisplay.innerHTML = formatTime(time.hours);
    console.log(`${time.hours} -- ${time.minutes} -- ${time.seconds}`);
};

function updateTimeFromInput() {
    const hours = parseInt(inputHours.value) || 0;
    const minutes = parseInt(inputMinutes.value) || 0;
    const seconds = parseInt(inputSeconds.value) || 0;
    totalSeconds = hours * 3600 + minutes * 60 + seconds;
    updateDisplay();
}

function toggleChronometer() {
    if (!isRunning) {
        intervalId = setInterval(countdown, intervalTime);
        isRunning = true;
        clearInputFields();
        startButton.innerHTML = 'Pause';
    } else {
        clearInterval(intervalId);
        isRunning = false;
        startButton.innerHTML = 'Play';
    }
}

function countdown() {
    if (totalSeconds === 0) {
        clearInterval(intervalId);
        message.innerHTML = 'Time is up!';
        totalSeconds = 0;
        updateDisplay();
        isRunning = false;
        return;
    }
    if (timeIsInvalid(totalSeconds)) {
        reset();
        message.innerHTML = 'Invalid time';
        return;
    }
    totalSeconds--;
    updateDisplay();
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    totalSeconds = 0;
    startButton.innerHTML = 'Start';
    message.innerHTML = '';
    clearInputFields();
    updateDisplay();
}

startButton.addEventListener('click', toggleChronometer);
resetButton.addEventListener('click', reset);
inputHours.addEventListener('change', updateTimeFromInput);
inputMinutes.addEventListener('change', updateTimeFromInput);
inputSeconds.addEventListener('change', updateTimeFromInput);

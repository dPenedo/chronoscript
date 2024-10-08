import { formatTime, timeIsUp, timeIsInvalid, decrementTime } from './utils.js';

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

const clearInputFields = () => {
    inputHours.value = '';
    inputMinutes.value = '';
    inputSeconds.value = '';
};

function updateTimeFromInput() {
    hours = parseInt(inputHours.value) || 0;
    minutes = parseInt(inputMinutes.value) || 0;
    seconds = parseInt(inputSeconds.value) || 0;
    updateDisplay();
}
const updateDisplay = () => {
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);
};

function toggleChronometer() {
    if (!isRunning) {
        intervalId = setInterval(countdown, intervalTime);
        updateDisplay();
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
    if (timeIsInvalid({ seconds, minutes, hours })) {
        reset();
        message.innerHTML = 'Invalid time';
        return;
    }
    if (timeIsUp({ seconds, minutes, hours })) {
        clearInterval(intervalId);
        document.querySelector('button').innerHTML = 'Play';
        message.innerHTML = 'Time is up!';
        seconds = minutes = hours = 0;
        updateDisplay();
        isRunning = false;
        clearInputFields();
        return;
    }
    const updatedTime = decrementTime({ seconds, minutes, hours });
    seconds = updatedTime.seconds;
    minutes = updatedTime.minutes;
    hours = updatedTime.hours;
    updateDisplay();
}

function reset() {
    clearInterval(intervalId);
    isRunning = false;
    seconds = minutes = hours = 0;
    startButton.innerHTML = 'Start';
    message.innerHTML = '';
    clearInputFields();
    updateDisplay();
    if (isRunning) {
        toggleChronometer();
    }
}
startButton.addEventListener('click', toggleChronometer);
resetButton.addEventListener('click', reset);
inputHours.addEventListener('change', updateTimeFromInput);
inputMinutes.addEventListener('change', updateTimeFromInput);
inputSeconds.addEventListener('change', updateTimeFromInput);

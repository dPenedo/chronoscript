let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let isRunning = false;
let intervalId;

const millisecondsDisplay = document.querySelector('.clock__millisec');
const secondsDisplay = document.querySelector('.clock__sec');
const minutesDisplay = document.querySelector('.clock__min');
const hoursDisplay = document.querySelector('.clock__hours');
const startButton = document.querySelector('.button_play-pause');
const resetButton = document.querySelector('.button_reset');

startButton.addEventListener('click', toggleChronometer);
resetButton.addEventListener('click', reset);

function toggleChronometer() {
    if (!isRunning) {
        intervalId = setInterval(count, 10);
        isRunning = true;
        document.querySelector('button').innerHTML = "Pause";
    } else {
        clearInterval(intervalId);
        isRunning = false;
        document.querySelector('button').innerHTML = "Play";
    }
}
function count() {
    milliseconds++;
    millisecondsDisplay.innerHTML = formatTime(milliseconds);
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);

    // if (counter % 10 === 0) {
    //     alert(`Count is now ${counter}`);
    // }
    if (milliseconds % 100 === 0 && milliseconds !== 0) {
        milliseconds = 0;
        seconds++;
    } else if (seconds % 60 === 0 && seconds !== 0) {
        seconds = 0;
        minutes++;
    } else if (minutes % 60 === 0 && minutes !== 0) {
        minutes = 0;
        hour++;
    }
}
function updateDisplay() {
    millisecondsDisplay.innerHTML = formatTime(milliseconds);
    secondsDisplay.innerHTML = formatTime(seconds);
    minutesDisplay.innerHTML = formatTime(minutes);
    hoursDisplay.innerHTML = formatTime(hours);

}
function formatTime(time) {
    return time < 10 ? "0" + time : time;
}



function reset() {
    clearInterval(intervalId);
    isRunning = false;
    milliseconds = seconds = minutes = hours = 0;
    startButton.innerHTML = "Start";
    updateDisplay();
    if (isRunning) {
        toggleChronometer();
    }
}
function updateTime() {


    const firstClockHours = document.querySelector('.clock__hours-main');
    const firstClockMinutes = document.querySelector('.clock__min-main');
    const firstClockSeconds = document.querySelector('.clock__sec-main');
    const secondClockHours = document.querySelector('.second-clock__hours');
    const secondclockMinutes = document.querySelector('.second-clock__min');
    const secondclockSeconds = document.querySelector('.second-clock__sec');

    // First clock logic
    const now = new Date();
    const firstHours = String(now.getHours()).padStart(2, '0');
    const firstMinutes = String(now.getMinutes()).padStart(2, '0');
    const firstSeconds = String(now.getSeconds()).padStart(2, '0');
    firstClockSeconds.textContent = firstSeconds;
    firstClockMinutes.textContent = firstMinutes;
    firstClockHours.textContent = firstHours;

    // Second clock logic


    const secondTimestamp = 1710767984;
    const secondMilliseconds = secondTimestamp * 1000;
    const secondDateObject = new Date(secondMilliseconds);
    const secondHours = ('0' + secondDateObject.getHours()).slice(-2);
    const secondMinutes = ('0' + secondDateObject.getMinutes()).slice(-2);
    const secondSeconds = ('0' + secondDateObject.getSeconds()).slice(-2);




    secondClockHours.textContent = secondHours;
    secondclockMinutes.textContent = secondMinutes;
    secondclockSeconds.textContent = secondSeconds;


}

setInterval(updateTime, 10);

// Get the time for the first time
updateTime();
const accordionButton = document.querySelector('.accordion__button');
const accordionContent = document.querySelector('.accordion__content');

accordionButton.addEventListener('click', function () {
    accordionContent.classList.toggle('active');
});


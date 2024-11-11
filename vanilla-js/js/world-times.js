import { formatTime } from './utils.js';

// HTML elements
const citySelect = document.querySelector('#cities');
const selectedCityName = document.querySelector('#selected-city-name');
const firstClockHours = document.querySelector('.clock__hours-main');
const firstClockMinutes = document.querySelector('.clock__min-main');
const firstClockSeconds = document.querySelector('.clock__sec-main');
const secondClockHours = document.querySelector('.second-clock__hours');
const secondClockMinutes = document.querySelector('.second-clock__min');
const secondClockSeconds = document.querySelector('.second-clock__sec');
const citiesButton = document.querySelector('.cities__button');
const citiesContent = document.querySelector('.cities__content');
const errorMessage = document.querySelector('#error-message');
let timeZoneOffsetHours = 999;

// Create forms options
fetch('http://worldtimeapi.org/api/timezone/')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach((place) => {
            const option = document.createElement('option');
            option.value = place;
            option.className = 'cities__option';
            option.textContent = place;
            citySelect.appendChild(option);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
        errorMessage.innerHTML =
            "Oops! Something went wrong. The time data couldn't be loaded from worldtimAPI server. Please try again later.";
    });

citySelect.addEventListener('change', (e) => {
    const selectedCity = citySelect.value;
    selectedCityName.textContent = selectedCity;
    fetch(`http://worldtimeapi.org/api/timezone/${selectedCity}`)
        .then((response) => response.json())
        .then((data) => {
            let utcOffset = data.utc_offset;
            // Convertir el offset en horas
            const [sign, hours, minutes] = utcOffset
                .match(/([+-])(\d{2}):(\d{2})/)
                .slice(1);
            timeZoneOffsetHours = getOffsetInHours(data.utcOffset);

            console.log(`Offset en horas: ${timeZoneOffsetHours}`);
            timeZoneOffsetHours = utcOffset;
        })
        .catch((error) => {
            console.error('Error:', error);
            errorMessage.innerHTML =
                "Oops! Something went wrong. The time data couldn't be loaded from worldtimAPI server. Please try again later.";
        });
});

function updateTime() {
    // First clock logicuserlocationnow
    const userLocationNow = new Date();
    const userLocationHours = formatTime(userLocationNow.getHours());
    const userLocationMinutes = formatTime(userLocationNow.getMinutes());
    const userLocationSeconds = formatTime(userLocationNow.getSeconds());
    const standardNow = new Date(userLocationNow.getTime());
    const selectedNow = new Date(
        standardNow.getTime() + timeZoneOffsetHours * 60 * 60 * 1000,
    ); // Sumar 8 horas en milisegundos

    const selectedHours = formatTime(selectedNow.getUTCHours());
    const selectedMinutes = formatTime(selectedNow.getUTCMinutes());
    const selectedSeconds = formatTime(selectedNow.getUTCSeconds());

    firstClockSeconds.textContent = userLocationSeconds;
    firstClockMinutes.textContent = userLocationMinutes;
    firstClockHours.textContent = userLocationHours;

    if (timeZoneOffsetHours === 999) {
        secondClockHours.textContent = '00';
        secondClockMinutes.textContent = '00';
        secondClockSeconds.textContent = '00';
    } else {
        secondClockHours.textContent = selectedHours;
        secondClockMinutes.textContent = selectedMinutes;
        secondClockSeconds.textContent = selectedSeconds;
    }
}
function getOffsetInHours(utcOffset) {
    const [sign, hours, minutes] = utcOffset
        .match(/([+-])(\d{2}):(\d{2})/)
        .slice(1);
    return parseInt(sign + hours) + parseInt(minutes) / 60;
}

setInterval(updateTime, 1000);

// Get the time for the first time
updateTime();

function closeAccordion() {
    citiesContent.classList.remove('active');
}

citiesButton.addEventListener('click', function (event) {
    citiesContent.classList.toggle('active');
    event.stopPropagation();
});
document.addEventListener('click', function (event) {
    const target = event.target;
    if (!citiesContent.contains(target) && !citiesButton.contains(target)) {
        closeAccordion();
    }
});

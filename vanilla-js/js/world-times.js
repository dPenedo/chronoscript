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
const URLForListOfCities = 'https://timeapi.io/api/timezone/availabletimezones';
const URLForGettingTheTimeZone =
    'https://timeapi.io/api/timezone/zone?timeZone=';

let timeZoneOffsetMinutes = 9999;

// Create forms options
fetch(URLForListOfCities)
    .then((response) => response.json())
    .then((data) => {
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
    console.log(selectedCity);
    const selectedCityEndPoint = selectedCity.toLowerCase();
    fetch(`${URLForGettingTheTimeZone}${selectedCityEndPoint}`)
        .then((response) => response.json())
        .then((data) => {
            let utcOffsetSeconds = data.standardUtcOffset.seconds;
            timeZoneOffsetMinutes = utcOffsetSeconds / 60; // -10800 / 60 = -180 minutos
            console.log(`Offset en minutos: ${timeZoneOffsetMinutes}`);
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
    const standardNow = new Date(
        userLocationNow.getTime() +
            userLocationNow.getTimezoneOffset() * 60 * 1000,
    );
    const selectedNow = new Date(
        standardNow.getTime() + timeZoneOffsetMinutes * 60 * 1000,
    );
    console.log('------------------------');
    console.log(`standard now: ${standardNow}`);
    console.log(`selected now: ${selectedNow}`);

    const selectedHours = formatTime(selectedNow.getHours());
    const selectedMinutes = formatTime(selectedNow.getMinutes());
    const selectedSeconds = formatTime(selectedNow.getSeconds());

    firstClockSeconds.textContent = userLocationSeconds;
    firstClockMinutes.textContent = userLocationMinutes;
    firstClockHours.textContent = userLocationHours;

    if (timeZoneOffsetMinutes === 9999) {
        secondClockHours.textContent = '00';
        secondClockMinutes.textContent = '00';
        secondClockSeconds.textContent = '00';
    } else {
        secondClockHours.textContent = selectedHours;
        secondClockMinutes.textContent = selectedMinutes;
        secondClockSeconds.textContent = selectedSeconds;
    }
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

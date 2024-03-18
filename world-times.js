// HTML elements

const citySelect = document.querySelector('#cities');
const selectedCityName = document.querySelector('#selected-city-name');
const firstClockHours = document.querySelector('.clock__hours-main');
const firstClockMinutes = document.querySelector('.clock__min-main');
const firstClockSeconds = document.querySelector('.clock__sec-main');
const secondClockHours = document.querySelector('.second-clock__hours');
const secondclockMinutes = document.querySelector('.second-clock__min');
const secondclockSeconds = document.querySelector('.second-clock__sec');


// Create forms options
fetch('http://worldtimeapi.org/api/timezone/')
    .then(response => response.json())
    .then(data => {
        for (const place in data) {
            if (Object.hasOwnProperty.call(data, place)) {
                const option = document.createElement('option');
                option.value = data[place];
                option.className = "cities__option";
                option.textContent = data[place];
                citySelect.appendChild(option);

            }
        }
    })
    .catch(error => {
        console.log("Error: " + error);
    });


function updateTime() {



    // First clock logic
    const now = new Date();
    const firstHours = String(now.getHours()).padStart(2, '0');
    const firstMinutes = String(now.getMinutes()).padStart(2, '0');
    const firstSeconds = String(now.getSeconds()).padStart(2, '0');
    firstClockSeconds.textContent = firstSeconds;
    firstClockMinutes.textContent = firstMinutes;
    firstClockHours.textContent = firstHours;



    selectedCity = citySelect.value;
    if (selectedCity != "") {
        selectedCityName.textContent = selectedCity;
        fetch(`http://worldtimeapi.org/api/timezone/${selectedCity}`)
            .then(response => response.json())
            .then(data => {
                let datetimeString = data.datetime;

                // Extract timezone offset
                const secondHours = datetimeString.slice(11, 13);
                const secondMinutes = datetimeString.slice(14, 16);
                const secondSeconds = datetimeString.slice(17, 19);
                secondClockHours.textContent = secondHours;
                secondclockMinutes.textContent = secondMinutes;
                secondclockSeconds.textContent = secondSeconds;
            })
            .catch(error => {
                console.log("Error: " + error);
            });


    }


}

setInterval(updateTime, 1000);

// Get the time for the first time
updateTime();

const citiesButton = document.querySelector('.cities__button');
const citiesContent = document.querySelector('.cities__content');

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
})


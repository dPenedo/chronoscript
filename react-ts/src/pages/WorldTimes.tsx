import styles from './worldTimes.module.css';
import Clock from '../components/Clock';
import { useEffect, useRef, useState } from 'react';
// import { formatTime } from '../utils/timeUtils';

export default function Ip() {
    const [userTime, setUserTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [userHours, userMinutes, userSeconds] = [
        userTime.hours,
        userTime.minutes,
        userTime.seconds,
    ];
    const [selectedTime, setSelectedTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [selectedCity, setSelectedCity] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [timeZoneOffsetMinutes, setTimeZoneOffsetMinutes] = useState(9999);

    const [selectedHours, selectedMinutes, selectedSeconds] = [
        selectedTime.hours,
        selectedTime.minutes,
        selectedTime.seconds,
    ];
    const toggleAccordion = () => {
        setOpenedListOfCities(!openedListOfCities);
    };

    const [openedListOfCities, setOpenedListOfCities] = useState(false);

    const [listOfCities, setListOfCities] = useState<string[]>([]);

    const wrapperRef = useRef<HTMLDivElement | null>(null);

    // Set Time
    useEffect(() => {
        const updateTime = () => {
            // First clock logic
            const userLocationNow = new Date();
            setUserTime({
                hours: userLocationNow.getHours(),
                minutes: userLocationNow.getMinutes(),
                seconds: userLocationNow.getSeconds(),
            });
            // Second clock logic
            const standardNow = new Date(
                userLocationNow.getTime() +
                    userLocationNow.getTimezoneOffset() * 60 * 1000,
            );
            const selectedNow = new Date(
                standardNow.getTime() + timeZoneOffsetMinutes * 60 * 1000,
            );

            setSelectedTime({
                hours: selectedNow.getHours(),
                minutes: selectedNow.getMinutes(),
                seconds: selectedNow.getSeconds(),
            });
        };

        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [timeZoneOffsetMinutes]); // Dependemos de timeZoneOffsetMinutes para actualizar el reloj

    const URLForListOfCities =
        'https://timeapi.io/api/timezone/availabletimezones';
    const URLForGettingTheTimeZone =
        'https://timeapi.io/api/timezone/zone?timeZone=';

    // Obtener el UTC de la ciudad seleccionada
    const getCitysUTC = () => {
        fetch(`${URLForGettingTheTimeZone}${selectedCity.toLowerCase()}`)
            .then((response) => response.json())
            .then((data) => {
                console.log('data ->' + data);
                const utcOffsetSeconds = data.standardUtcOffset.seconds;
                setTimeZoneOffsetMinutes(utcOffsetSeconds / 60); // Establece el offset en minutos
                console.log(`Offset en minutos: ${utcOffsetSeconds / 60}`);
            })
            .catch((error) => {
                console.error('Error:', error);
                setErrorMessage(
                    "Oops! Something went wrong. The time data couldn't be loaded from timeApi.io server. Please try again later.",
                );
            });
    };

    // Set list of cities
    useEffect(() => {
        fetch(URLForListOfCities)
            .then((response) => response.json())
            .then((data: string[]) => {
                setListOfCities(data);
            })
            .catch((error) => {
                console.log('Error:' + error);
            });
    }, []);

    // Actualizar el UTC de la ciudad cuando cambia la selección
    useEffect(() => {
        if (selectedCity) {
            getCitysUTC();
        }
    }, [selectedCity]); // Se ejecuta cuando la ciudad seleccionada cambia

    // Close accordion on click outside cities list
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent | TouchEvent) => {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setOpenedListOfCities(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    return (
        <div className="section">
            <h1 className="main-title">World Times</h1>
            <Clock
                hours={userHours}
                minutes={userMinutes}
                seconds={userSeconds}
                showCentiseconds={false}
            />
            <h1 className={styles.clock__title} id="selected-city-name">
                {selectedCity === '' ? "Selected City's Time" : selectedCity}
            </h1>
            <Clock
                hours={timeZoneOffsetMinutes === 9999 ? 0 : selectedHours}
                minutes={timeZoneOffsetMinutes === 9999 ? 0 : selectedMinutes}
                seconds={timeZoneOffsetMinutes === 9999 ? 0 : selectedSeconds}
                showCentiseconds={false}
            />
            <div className={styles.cities}>
                <button
                    onClick={toggleAccordion}
                    className={styles.cities__button}
                >
                    Select a city ⬇
                </button>
                <div
                    className={`${styles.cities__content} ${openedListOfCities ? styles.cities__content_active : ''}`}
                    ref={wrapperRef}
                >
                    <form className={styles.cities__form} method="get">
                        <select
                            className={styles.cities__select}
                            name="cities"
                            id="cities"
                            onChange={(e) => {
                                const cityFromSelect = e.target.value;
                                setSelectedCity(cityFromSelect);
                            }}
                            size={8}
                        >
                            {listOfCities.map((city: string) => (
                                <option
                                    className={styles.cities__option}
                                    key={city}
                                    value={city}
                                >
                                    {city}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
                <div className={styles.error_message}>{errorMessage}</div>
            </div>
        </div>
    );
}

import styles from './worldTimes.module.css';
import Clock from '../components/Clock';
import { useEffect, useRef, useState } from 'react';
import { fetchTimeZone, fetchListOfCities } from '../utils/apiUtils';

export default function WorldTimes() {
    // states for time
    const [userTime, setUserTime] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [selectedCity, setSelectedCity] = useState('');
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
    const [timeZoneOffsetMinutes, setTimeZoneOffsetMinutes] = useState(9999);

    // states for ui and list of cities
    const [openedListOfCities, setOpenedListOfCities] = useState(false);
    const [listOfCities, setListOfCities] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [selectedHours, selectedMinutes, selectedSeconds] = [
        selectedTime.hours,
        selectedTime.minutes,
        selectedTime.seconds,
    ];
    const toggleAccordion = () => {
        setOpenedListOfCities(!openedListOfCities);
    };

    const updateUserTime = () => {
        const userLocationNow = new Date();
        setUserTime({
            hours: userLocationNow.getHours(),
            minutes: userLocationNow.getMinutes(),
            seconds: userLocationNow.getSeconds(),
        });
    };
    const updateSelectedTime = () => {
        const userLocationNow = new Date();
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

    // Set Time
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateUserTime();
            updateSelectedTime();
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeZoneOffsetMinutes]); // Dependemos de timeZoneOffsetMinutes para actualizar el reloj

    // Set list of cities
    useEffect(() => {
        const getCities = async () => {
            try {
                const cities = await fetchListOfCities();
                setListOfCities(cities);
            } catch (error) {
                setErrorMessage('Error loading the list of cities');
                console.error(error);
            }
        };
        getCities();
    }, []);

    // Actualizar el UTC de la ciudad cuando cambia la selección
    useEffect(() => {
        const getTimeZoneOffset = async () => {
            if (selectedCity) {
                try {
                    const offset = await fetchTimeZone(selectedCity);
                    setTimeZoneOffsetMinutes(offset);
                } catch (error) {
                    setErrorMessage('Error loading the city time information');
                    console.error(error);
                }
            }
        };
        getTimeZoneOffset();
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
                            onClick={toggleAccordion}
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

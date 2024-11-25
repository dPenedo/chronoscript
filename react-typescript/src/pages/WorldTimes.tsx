import styles from './worldTimes.module.css';
import Clock from '../components/Clock';
import { useEffect, useRef, useState } from 'react';
import { fetchTimeZone, fetchListOfCities } from '../utils/apiUtils';
import CitySelectorForm from '../components/CitySelectorForm';
import { updateUserTime, updateSelectedTime } from '../utils/timeUtils';
import AccordionButton from '../components/AccordionButton';

interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

export default function WorldTimes() {
    const [userTime, setUserTime] = useState<Time>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [selectedTime, setSelectedTime] = useState<Time>({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [timeZoneOffsetMinutes, setTimeZoneOffsetMinutes] = useState(9999);

    // states for ui and list of cities
    const [openedListOfCities, setOpenedListOfCities] = useState(false);
    const [listOfCities, setListOfCities] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    // WARN: type null borrado
    const wrapperRef = useRef<null | HTMLDivElement>(null);

    const toggleAccordion = () => setOpenedListOfCities((prev) => !prev);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const userLocationNow = new Date();
            setUserTime(updateUserTime());
            setSelectedTime(
                updateSelectedTime(userLocationNow, timeZoneOffsetMinutes),
            );
        }, 1000);
        return () => clearInterval(intervalId);
    }, [timeZoneOffsetMinutes]);

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
    }, [selectedCity]);

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
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const {
        hours: userHours,
        minutes: userMinutes,
        seconds: userSeconds,
    } = userTime;
    const {
        hours: selectedHours,
        minutes: selectedMinutes,
        seconds: selectedSeconds,
    } = selectedTime;

    const selectedClock =
        timeZoneOffsetMinutes === 9999
            ? { hours: 0, minutes: 0, seconds: 0 }
            : {
                  hours: selectedHours,
                  minutes: selectedMinutes,
                  seconds: selectedSeconds,
              };

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
                hours={selectedClock.hours}
                minutes={selectedClock.minutes}
                seconds={selectedClock.seconds}
                showCentiseconds={false}
            />
            <div className={styles.cities}>
                <AccordionButton onClick={toggleAccordion} />
                <div
                    className={`${styles.cities__content} ${openedListOfCities ? styles.cities__content_active : ''}`}
                    ref={wrapperRef}
                >
                    <CitySelectorForm
                        listOfCities={listOfCities}
                        onCitySelect={setSelectedCity}
                        onToggleAccordion={toggleAccordion}
                    />
                </div>
                {errorMessage && (
                    <div className={styles.error_message}>{errorMessage}</div>
                )}
            </div>
        </div>
    );
}

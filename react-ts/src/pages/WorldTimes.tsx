import styles from './worldTimes.module.css';
import Clock from "../components/Clock";
import { useEffect, useState } from 'react';
export default function Ip() {

    const [userTime, setUserTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [userHours, userMinutes, userSeconds] = [userTime.hours, userTime.minutes, userTime.seconds];
    const [selectedTime, setSelectedTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [selectedHours, selectedMinutes, selectedSeconds] = [selectedTime.hours, selectedTime.minutes, selectedTime.seconds];
    let citiesOptions = null;


    const updateTime = () => {
        // First clock logic
        const now = new Date();
        const firstHours = now.getHours();
        const firstMinutes = now.getMinutes();
        const firstSeconds = now.getSeconds();
        setUserTime({ hours: firstHours, minutes: firstMinutes, seconds: firstSeconds });

    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            updateTime();
        }, 1000);
        return () => clearInterval(intervalId);
    })

    useEffect(() => {
        fetch('http://worldtimeapi.org/api/timezone/')
            .then((response) => response.json())
            .then((data) => {
                for (const place in data) {
                    if (Object.hasOwnProperty.call(data, place)) {
                        const option = document.createElement('option');
                        option.value = data[place];
                        option.className = 'cities__option';
                        option.textContent = data[place];
                        citiesOptions = option
                        console.log(option)
                    }
                }
            })
            .catch((error) => {
                console.log('Error:' + error);
            });
        return () => {
        }
    }, [])






    return (
        <div className="section">
            <h1 className="main-title">World Times</h1>
            <Clock hours={userHours} minutes={userMinutes} seconds={userSeconds} showCentiseconds={false} />
            <h1 className={styles.clock__title} id="selected-city-name">
                Selected City's Time
            </h1>
            <Clock hours={selectedHours} minutes={selectedMinutes} seconds={selectedSeconds} showCentiseconds={false} />
            <div className={styles.cities}>
                <button className={styles.cities__button}>Select a city ⬇</button>
                <div className={styles.cities__content}>
                    <form className={styles.cities__form} method="get">
                        <select className={styles.cities__select} name="cities" id="cities" size={8}>{citiesOptions}</select>
                    </form>
                </div>
            </div>
        </div>
    );
}

import styles from './worldTimes.module.css';
import Clock from "../components/Clock";
import { useState } from 'react';
export default function Ip() {

    const [userTime, setUserTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [userHours, userMinutes, userSeconds] = [userTime.hours, userTime.minutes, userTime.seconds];
    const [selectedTime, setSelectedTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [selectedHours, selectedMinutes, selectedSeconds] = [selectedTime.hours, selectedTime.minutes, selectedTime.seconds];


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
                        <select className={styles.cities__select} name="cities" id="cities" size={8}></select>
                    </form>
                </div>
            </div>
        </div>
    );
}

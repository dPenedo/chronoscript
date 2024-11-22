import { ChangeEvent, useEffect, useState } from "react";
import Clock from "../components/Clock";
import Button from "../components/Button";
import { calculateTimeFromCentiseconds } from "../utils/timeUtils";
import Styles from "./countdown.module.css";

export default function Countdown() {
    const [countValue, setCountValue] = useState(0);
    const [inputValue, setInputValue] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('');
    const intervalValue = 1000;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputValue((prev) => ({
            ...prev,
            [name]: value, // Saves value as a string
        }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // Only allows numbers, backspace, and tab
        if (!/^[0-9]$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
            e.preventDefault(); // Prevents default behavior of the keypress other characters
        }
    };

    const getTotalCentiseconds = () => {
        return (inputValue.hours || 0) * 360000 +
               (inputValue.minutes || 0) * 6000 +
               (inputValue.seconds || 0) * 100;
    };

    const toggleCountdown = () => {
        if (isRunning) {
            setIsRunning(false);
            setInputValue({ hours: hours, minutes: minutes, seconds: seconds });
        } else {
            // Set countValue based on the current input values
            setMessage('Countdown started');
            setCountValue(getTotalCentiseconds());
            setIsRunning(true);
        }
    };

    const resetCountdown = () => {
        setMessage('');
        setIsRunning(false);
        setCountValue(0);
        setInputValue({ hours: 0, minutes: 0, seconds: 0 });
    };
    const clearInputFields = () => {
        setInputValue({ hours: 0, minutes: 0, seconds: 0 });
    };


    useEffect(() => {
        let intervalId: number;
        if (isRunning && countValue > 0) {
            console.log(`is running${countValue}`)
            intervalId = setInterval(() => {
                setCountValue((prev) => prev - 100); // Decrement by 1000 (1 second in centiseconds)
            }, intervalValue);
        } else if (countValue <= 0) {
            clearInputFields()
            setMessage('Countdown ended');
            setIsRunning(false);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, countValue]);

    const { hours, minutes, seconds } = calculateTimeFromCentiseconds(countValue);

    return (
        <div className="section">
            <h1 className="main-title">Countdown</h1>
            <Clock hours={hours} minutes={minutes} seconds={seconds} showCentiseconds={false} />

            <div className={Styles.setTimer}>
                <form className={Styles.setTimer__form} method="get">
                    <label className="set-timer__label" htmlFor="hours-timer-input">Enter hours:</label>
                    <input
                        className={Styles.setTimer__input}
                        type="text"
                        id="hours-timer-input"
                        name="hours"
                        value={inputValue.hours}
                        placeholder="Hours"
                        required
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />

                    <label className="set-timer__label" htmlFor="minutes-timer-input">Enter minutes:</label>
                    <input
                        className={Styles.setTimer__input}
                        type="text"
                        id="minutes-timer-input"
                        name="minutes"
                        value={inputValue.minutes}
                        placeholder="Minutes"
                        required
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />

                    <label className="set-timer__label" htmlFor="seconds-timer-input">Enter seconds:</label>
                    <input
                        className={Styles.setTimer__input}
                        type="text"
                        id="seconds-timer-input"
                        name="seconds"
                        value={inputValue.seconds}
                        placeholder="Seconds"
                        required
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />
                </form>
            </div>

            <div className="buttons__container">
                <Button onClick={toggleCountdown}>{isRunning ? 'Pause' : 'Start'}</Button>
                <Button onClick={resetCountdown}>Reset</Button>
            </div>
            <div className={Styles.message__container}>
                <p className={Styles.message__text} id="message">{message}</p>
            </div>
        </div>
    );
}

import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Clock from '../components/Clock';
import { calculateTimeFromCentiseconds } from '../utils/timeUtils';

export default function Home() {
    const [countValue, setCountValue] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalValue = 10;

    const toggleCount = () => {
        if (isRunning) {
            setIsRunning(false);
        } else {
            setIsRunning(true);
        }
    };
    const resetCount = () => {
        setIsRunning(false);
        setCountValue(0);
        console.log('reiniciado');
    };
    useEffect(() => {
        // type possible problem?
        let intervalId: number;
        if (isRunning) {
            intervalId = setInterval(() => {
                setCountValue((countValue) => countValue + 1);
            }, intervalValue);
        }
        return () => clearInterval(intervalId);
    }, [isRunning]);
    const { hours, minutes, seconds, centiseconds } =
        calculateTimeFromCentiseconds(countValue);
    return (
        <div className="section">
            <h1 className="main-title">STOPWATCH</h1>
            <Clock
                hours={hours}
                minutes={minutes}
                seconds={seconds}
                centiseconds={centiseconds}
                showCentiseconds={true}
            />

            <div className="buttons__container">
                <Button onClick={toggleCount}>
                    {isRunning ? 'Stop' : 'Start'}
                </Button>
                <Button onClick={resetCount}>Reset</Button>
            </div>
        </div>
    );
}

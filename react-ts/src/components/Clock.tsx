import { formatTime } from "../utils/timeUtils";
import styles from "./clock.module.css";

interface ClockProps {
    hours: number;
    minutes: number;
    seconds: number;
    centiseconds? : number;
    showCentiseconds? : boolean;
}


export default function Clock({hours, minutes, seconds, centiseconds, showCentiseconds}: ClockProps) {
     const formattedTime = {
        hours: formatTime(hours),
        minutes: formatTime(minutes),
        seconds: formatTime(seconds),
        centiseconds: centiseconds!==undefined ? formatTime(centiseconds) : "00",
    };
  return (
            <div className={styles.clock}>
                <div >{formattedTime.hours}</div>
                <div className={styles.clock__separator}>:</div>
                <div >{formattedTime.minutes}</div>
                <div className={styles.clock__separator}>:</div>
                <div >{formattedTime.seconds}</div>
                { showCentiseconds && (
                    <>
                <div className={styles.clock__separator}>:</div>
                <div >{formattedTime.centiseconds}</div>
                    </>
                )
                }
            </div>
  )
}


import { formatTime } from "../utils/timeUtils";

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
        <div className="clock">
            <div className="clock__container">
                <div className="clock__hours">{formattedTime.hours}</div>
                <div className="clock__separator">:</div>
                <div className="clock__min">{formattedTime.minutes}</div>
                <div className="clock__separator">:</div>
                <div className="clock__sec">{formattedTime.seconds}</div>
                { showCentiseconds && (
                    <>
                <div className="clock__separator">:</div>
                <div className="clock__centisec">{formattedTime.centiseconds}</div>
                    </>
                )
                }
            </div>
        </div>
  )
}


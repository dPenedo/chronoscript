export const formatTime = (time) => {
    return time < 10 ? '0' + time : String(time);
};

export const calculateTimeFromCentiseconds = (totalCentiseconds) => {
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = totalCentiseconds % 100;

    return { hours, minutes, seconds, centiseconds };
};
export const timeIsInvalid = (totalSeconds) => {
    const time = calculateTimeFromCentiseconds(totalSeconds);
    time.minutes > 59 ||
        time.seconds > 59 ||
        time.hours < 0 ||
        time.minutes < 0 ||
        time.seconds < 0;
};

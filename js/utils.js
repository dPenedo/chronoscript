export const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
};

export const calculateTimeFromMilliseconds = (totalMilliseconds) => {
    const parsedTotalSeconds = Math.floor(totalMilliseconds / 1000);

    const hours = Math.floor(parsedTotalSeconds / 3600);
    const minutes = Math.floor((parsedTotalSeconds % 3600) / 60);
    const seconds = parsedTotalSeconds % 60;
    const milliseconds = totalMilliseconds % 100;

    return { hours, minutes, seconds, milliseconds };
};
export const timeIsInvalid = (totalSeconds) => {
    const time = calculateTimeFromMilliseconds(totalSeconds);
    time.minutes > 59 ||
        time.seconds > 59 ||
        time.hours < 0 ||
        time.minutes < 0 ||
        time.seconds < 0;
};

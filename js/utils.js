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

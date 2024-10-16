export const formatTime = (time: number) => {
    return time < 10 ? '0' + time : String(time);
};

export const calculateTimeFromCentiseconds = (totalCentiseconds: number) => {
    const totalSeconds = Math.floor(totalCentiseconds / 100);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const centiseconds = totalCentiseconds % 100;

    return { hours, minutes, seconds, centiseconds };
};

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

export const calculateTimeFromTimeZone = (
    userLocationNow: Date,
    timeZoneOffsetMinutes: number,
) => {
    const standardNow = new Date(
        userLocationNow.getTime() +
            userLocationNow.getTimezoneOffset() * 60 * 1000,
    );
    const selectedNow = new Date(
        standardNow.getTime() + timeZoneOffsetMinutes * 60 * 1000,
    );
    return {
        hours: selectedNow.getHours(),
        minutes: selectedNow.getMinutes(),
        seconds: selectedNow.getSeconds(),
    };
};

export const updateUserTime = () => {
    const userLocationNow = new Date();
    return {
        hours: userLocationNow.getHours(),
        minutes: userLocationNow.getMinutes(),
        seconds: userLocationNow.getSeconds(),
    };
};
export const updateSelectedTime = (
    userLocationNow: Date,
    timeZoneOffsetMinutes: number,
) => {
    return calculateTimeFromTimeZone(userLocationNow, timeZoneOffsetMinutes);
};

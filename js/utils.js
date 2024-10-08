export const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
};
export const timeIsInvalid = ({ seconds, minutes, hours }) =>
    minutes > 59 || seconds > 59 || hours < 0 || minutes < 0 || seconds < 0;

export const timeIsUp = ({ seconds, minutes, hours }) =>
    seconds === 0 && minutes === 0 && hours === 0;

export const decreaseTime = ({ seconds, minutes, hours }) => {
    if (seconds === 0 && minutes === 0 && hours > 0) {
        return { seconds: 59, minutes: 59, hours: hours - 1 };
    } else if (seconds === 0 && minutes > 0) {
        return { seconds: 59, minutes: minutes - 1, hours };
    } else if (minutes === 0 && hours > 0) {
        return { seconds, minutes: 59, hours: hours - 1 };
    } else {
        return { seconds: seconds - 1, minutes, hours };
    }
};

export const increaseTime = ({ milliseconds, seconds, minutes, hours }) => {
    if (milliseconds % 100 === 0 && milliseconds !== 0) {
        return { milliseconds: 0, seconds: seconds + 1, minutes, hours };
    } else if (seconds % 60 === 0 && seconds !== 0) {
        return { seconds: 0, minutes: minutes + 1, hours };
    } else if (minutes % 60 === 0 && minutes !== 0) {
        return { minutes: 0, hours: hours + 1 };
    }
};

export const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
};
export const timeIsInvalid = ({ seconds, minutes, hours }) =>
    minutes > 59 || seconds > 59 || hours < 0 || minutes < 0 || seconds < 0;

export const timeIsUp = ({ seconds, minutes, hours }) =>
    seconds === 0 && minutes === 0 && hours === 0;

export const decrementTime = ({ seconds, minutes, hours }) => {
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

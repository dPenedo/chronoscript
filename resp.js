export const adjustTime = (
    { milliseconds, seconds, minutes, hours },
    adjustment,
) => {
    if (adjustment == 'increase') {
        milliseconds++;
        if (milliseconds > 99) {
            milliseconds = 0;
            seconds++;
        } else if (seconds > 59) {
            milliseconds = 0;
            seconds = 0;
            minutes++;
        } else if (minutes > 59) {
            milliseconds = 0;
            seconds = 0;
            minutes = 0;
            hours++;
        }
        return { milliseconds, seconds, minutes, hours };
    } else if (adjustment == 'decrease') {
        seconds--;
        if ((seconds === minutes) === 0 && hours > 0) {
            seconds = 59;
            minutes = 59;
            hours--;
        } else if (seconds === 0 && minutes < 0) {
            seconds = 59;
            minutes--;
        } else if (minutes === 0 && hours > 0) {
            seconds--;
        }
        return { seconds, minutes, hours };
    }
    throw new Error(
        'Invalid adjustment on adjustTime function. Use "increase" or "decrease"',
    );
};

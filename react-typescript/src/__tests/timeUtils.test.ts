import { describe, expect, test } from 'vitest';
import {
    calculateTimeFromCentiseconds,
    calculateTimeFromTimeZone,
    formatTime,
    updateSelectedTime,
    updateUserTime,
} from '../utils/timeUtils';

describe('formatTime', () => {
    test('should format time with leading zeros for numbers less than 10', () => {
        expect(formatTime(3)).toBe('03');
        expect(formatTime(8)).toBe('08');
    });

    test('should return the same time for numbers 10 or greater', () => {
        expect(formatTime(10)).toBe('10');
        expect(formatTime(15)).toBe('15');
    });
});

describe('calculateTimeFromCentiseconds', () => {
    test('returns an object of 2 seconds and 50 centiseconds when passing 250 centiseconds', () => {
        const totalCentiseconds = 250;
        expect(calculateTimeFromCentiseconds(totalCentiseconds)).toStrictEqual({
            hours: 0,
            minutes: 0,
            seconds: 2,
            centiseconds: 50,
        });
    });
    test('returns an object of 15 minutes when passing 90000 centiseconds', () => {
        const totalCentiseconds = 90000;
        expect(calculateTimeFromCentiseconds(totalCentiseconds)).toStrictEqual({
            hours: 0,
            minutes: 15,
            seconds: 0,
            centiseconds: 0,
        });
    });
    test('returns an object of 2 hours, 30 minutes and 2 seconds and 50 centiseconds when passing 900000 centiseconds', () => {
        const totalCentiseconds = 900000;
        expect(calculateTimeFromCentiseconds(totalCentiseconds)).toStrictEqual({
            hours: 2,
            minutes: 30,
            seconds: 0,
            centiseconds: 0,
        });
    });
});

describe('calculateTimeFromTimeZone', () => {
    test('should return the current time', () => {
        const userLocationNow = new Date();
        const timeZoneOffsetMinutes = -180; // Arg
        expect(
            calculateTimeFromTimeZone(userLocationNow, timeZoneOffsetMinutes),
        ).toStrictEqual({
            hours: userLocationNow.getHours(),
            minutes: userLocationNow.getMinutes(),
            seconds: userLocationNow.getSeconds(),
        });
    });
});

describe('updateUserTime', () => {
    test('should return the current time', () => {
        const userLocationNow = new Date();
        expect(updateUserTime()).toStrictEqual({
            hours: userLocationNow.getHours(),
            minutes: userLocationNow.getMinutes(),
            seconds: userLocationNow.getSeconds(),
        });
    });
});

describe('updateSelectedTime', () => {
    const userLocationTimeNow = new Date();
    test('should return the standard time', () => {
        const standardTimeDifference = -180;
        expect(
            updateSelectedTime(userLocationTimeNow, standardTimeDifference),
        ).toStrictEqual({
            hours: userLocationTimeNow.getHours(),
            minutes: userLocationTimeNow.getMinutes(),
            seconds: userLocationTimeNow.getSeconds(),
        });
    });
});

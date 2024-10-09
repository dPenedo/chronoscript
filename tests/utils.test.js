import {
    formatTime,
    timeIsInvalid,
    adjustTime,
    increaseTime,
} from '../js/utils';
test('formatTime debería dar formato de tiempo con ceros', () => {
    expect(formatTime('3')).toBe('03');
    expect(formatTime('10')).toBe('10');
    expect(formatTime('8')).toBe('08');
});

test('timeIsInvalid cuando son más de 59 segundos', () => {
    let time = { seconds: 99, minutes: 0, hours: 0 };
    expect(timeIsInvalid(time)).toBe(true);
});
test('timeIsInvalid cuando son más de 59 minutos', () => {
    let time = { seconds: 0, minutes: 111, hours: 0 };
    expect(timeIsInvalid(time)).toBe(true);
});
test('timeIsInvalid cuando son menos de 0 horas', () => {
    let time = { seconds: 0, minutes: 0, hours: -12 };
    expect(timeIsInvalid(time)).toBe(true);
});

test('timeIsUP termina cuando están en 0', () => {
    let time = { seconds: 0, minutes: 0, hours: 0 };
    expect(timeIsUp(time)).toBe(true);
});
test('timeIsUP no termina cuando están en más de 0', () => {
    let time = { seconds: 0, minutes: 0, hours: 10 };
    expect(timeIsUp(time)).toBe(false);
});
test('adjustTime en decrease debería bajar de a un segundo', () => {
    let time = { seconds: 20, minutes: 0, hours: 10 };
    expect(adjustTime(time)).toStrictEqual({
        seconds: 19,
        minutes: 0,
        hours: 10,
    });
});
test('adjustTime en decrease debería bajar de a un segundo ', () => {
    let time = { seconds: 18, minutes: 28, hours: 0 };
    expect(adjustTime(time)).toStrictEqual({
        seconds: 17,
        minutes: 28,
        hours: 0,
    });
});
test('adjustTime debería bajar de a un segundo', () => {
    let time = { seconds: 0, minutes: 28, hours: 0 };
    expect(adjustTime(time)).toStrictEqual({
        seconds: 59,
        minutes: 27,
        hours: 0,
    });
});
test('increaseTime debería subir de a un millisecond', () => {
    let time = { milliseconds: 12, seconds: 10, minutes: 28, hours: 0 };
    expect(increaseTime(time)).toStrictEqual({
        milliseconds: 13,
        seconds: 10,
        minutes: 28,
        hours: 0,
    });
});
test('increaseTime debería subir de a un millisecond y pasar de segundo si pasan de 99', () => {
    let time = { milliseconds: 99, seconds: 10, minutes: 28, hours: 0 };
    expect(increaseTime(time)).toStrictEqual({
        milliseconds: 0,
        seconds: 11,
        minutes: 28,
        hours: 0,
    });
});
test('increaseTime debería subir de a un millisecond y pasar de minuto si los segundos llegan pasan de 59 y los milliseconds pasan de 99', () => {
    let time = { milliseconds: 99, seconds: 59, minutes: 28, hours: 0 };
    expect(increaseTime(time)).toStrictEqual({
        milliseconds: 0,
        seconds: 0,
        minutes: 29,
        hours: 0,
    });
});

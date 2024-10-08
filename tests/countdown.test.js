import { formatTime } from '../js/countdown';
test('formatTime debería dar formato de tiempo con ceros', () => {
    expect(formatTime(3).toBe('03'));
    expect(formatTime(10).toBe('10'));
    expect(formatTime(0).toBe('00'));
});

// sum.test.js
import { expect, test } from '../../node_modules/vitest';
import { sum } from '../utils/sum.js';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

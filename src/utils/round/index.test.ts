import round from '.';

describe('round function', () => {
    it('should round numbers to the given digits.', () => {
        expect(round(10.324324324324, 5)).toBe(10.32432);
        expect(round(130.35, 3)).toBe(130.35);
        expect(round(10.324324, 0)).toBe(10);
    })
})
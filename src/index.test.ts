import Template from ".";

describe('index.ts', () => {
    it('should be the correct string', () => {
        expect(Template()).toBe('Template for NPM Packages!');
    })
});
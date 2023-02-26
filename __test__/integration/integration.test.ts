import Template from "../../lib";

describe('index.ts', () => {
    it('should be the correct string', () => {
        expect(Template()).toBe('Template for NPM Packages!');
    })
});
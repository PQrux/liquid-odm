import DocRef from ".";

it('should generate a DocRef', () => {
    expect(new DocRef('a', 'name')).toHaveProperty('uid');
})
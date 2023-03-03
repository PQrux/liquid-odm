import { User, generateUsers } from "../../../__mocks__/models/users";

describe('Model class', () => {

    test('UID property should return the uid properly.', () => {
        const [user] = generateUsers();

        user.path = 'Users/key';
        expect(user.UID).toBe('key');
    });

    test('MODEL_CONFIG property should return the same value as the method getModelConfig.', () => {
        const [user] = generateUsers();
        expect(user.MODEL_CONFIG).toBe(user.getModelConfig());
    });

    test.each([
        {uid: 'key', expected: `${User.prototype.getModelConfig().ROOT_PATH}/key`},
        {uid: undefined, expected: undefined},
    ])('UID should set the path property properly.', ({uid, expected}) => {
        const [user] = generateUsers();
        user.UID = uid;
        expect(user.path).toBe(expected);
    });

    it('should initialize data property', () => {
        expect(new User().data).toBeDefined();
        expect(generateUsers()[0].data).toBeDefined();
    });
    
    it('should create the reference properly.', () => {

    });
});
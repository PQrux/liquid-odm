import useValidate from ".";
import { StringModelProperty } from "../../models/model_property";

describe('useValidate function', () => {
    const errText = 'It must never be ok!';
    const notOk: StringModelProperty = {
        type: 'string',
        validate: (v) => v === 'ok' ? errText : undefined,
    };

    it('should return undefined if the validation is ok.', () => {
        expect(useValidate('abcd', notOk)).toBe(undefined);
    });

    it('should throw an error if the validation returns anything.', () => {
        expect(() => useValidate('ok', notOk)).toThrowError(new Error(errText));
    });
})
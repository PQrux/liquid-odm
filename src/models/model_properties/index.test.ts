import ModelProperties from ".";
import { User } from "../../../__mocks__/models/users";
import { ModelPropertiesList, ModelPropertyTypes, StringModelProperty } from "../model_property";

const makeProps = (typeProps: ModelPropertyTypes) => new ModelProperties({
    prop: {
        ...typeProps,
    }
});

describe('prepare method', () => {
    it('should apply the default value if it is not defined.', () => {
        const props = makeProps({type: 'number', default: 1});
        expect(props.prepareProperties({}).prop).toBe(1);
        expect(props.prepareProperties({prop: 5}).prop).toBe(5);
    });

    it('should throw an error if its required and not defined.', () => {
        const props = makeProps({type: 'number', required: true});
        expect(() => props.prepareProperties({})).toThrowError();
        expect(props.prepareProperties({prop: 5}).prop).toBe(5);
    });

    it('should use the validate function if its defined.', () => {
        const props = makeProps({type: 'number', validate: (v) => v % 2 ? 'Odd numbers are not accepted.' : undefined });
        expect(() => props.prepareProperties({prop: 3})).toThrowError();
        expect(props.prepareProperties({prop: 2})).toBeDefined();
    });

    it('should return undefined if its not required, not defined and has not default.', () => {
        const props = makeProps({type: 'number'});
        expect(props.prepareProperties({}).prop).toBe(undefined);
    });

    it('should throw an error if the property type is not valid.', () => {
        const props = makeProps({type: <any>'aaaa'});
        expect(() => props.prepareProperties({prop: 'a'})).toThrowError();
    });
})

describe('String property', () => {
    it('should check the value length.', () => {
        const props = makeProps({type: 'string', max: 10, min: 5});
        expect(() => props.prepareProperties({prop: 'abc'})).toThrowError();
        expect(() => props.prepareProperties({prop: 'abcdefghijk'})).toThrowError();
        expect(props.prepareProperties({prop: 'abcdefg'})).toBeDefined();
    });
    
    it('should change the string casing if necessary.', () => {
        const upper = makeProps({type: 'string', casing: 'upper'});
        const lower = makeProps({type: 'string', casing: 'lower'});
        
        expect(upper.prepareProperties({prop: 'TeSt'}).prop).toBe('TEST');
        expect(lower.prepareProperties({prop: 'TeSt'}).prop).toBe('test');
    });
});

describe('Number property', () => {
    it('should check the value maxs and mins.', () => {
        const props = makeProps({type: 'number', max: 10, min: 5});
        expect(() => props.prepareProperties({prop: 2})).toThrowError();
        expect(() => props.prepareProperties({prop: 11})).toThrowError();
        expect(props.prepareProperties({prop: 9})).toBeDefined();
    });
    
    it('should round the number to the given maxFractionDigits.', () => {
        const upper = makeProps({type: 'number', maxFractionDigits: 5});
        
        expect(upper.prepareProperties({prop: 5.454564433}).prop).toBe(5.45456);
    });
});

describe('Boolean property.', () => {
    it('should be the same value.', () => {
        const props = makeProps({type: 'boolean', default: true});
        expect(props.prepareProperties({prop: true}).prop).toBe(true);
        expect(props.prepareProperties({prop: false}).prop).toBe(false);
    });
});

describe('Date property', () => {
    it('should check the value maxs and mins.', () => {
        const props = makeProps({
            type: 'date', 
            max: new Date().setDate(15), 
            min: new Date().setDate(10),
        });
        expect(() => props.prepareProperties({prop: new Date().setDate(5)})).toThrowError();
        expect(() => props.prepareProperties({prop: new Date().setDate(20)})).toThrowError();
        expect(props.prepareProperties({prop: new Date().setDate(12)})).toBeDefined();
    });

    it('should check if the value is a valid date.', () => {
        const props = makeProps({type: 'date'});
        expect(() => props.prepareProperties({prop: 'abc'})).toThrowError();
        expect(props.prepareProperties({prop: '2023-03-03T04:51:31.497Z'})).toBeDefined();
        expect(props.prepareProperties({prop: 1677819123883})).toBeDefined();
        expect(props.prepareProperties({prop: new Date()})).toBeDefined();
    });

    it('should always return a date object.', () => {
        const props = makeProps({type: 'date'});
        const date = new Date(), time = date.getTime();
        expect(props.prepareProperties({prop: date.toISOString()}).prop.getTime()).toBe(time);
        expect(props.prepareProperties({prop: time}).prop.getTime()).toBe(time);
        expect(props.prepareProperties({prop: new Date(date)}).prop.getTime()).toBe(time);
    });
});

describe('Enum property.', () => {
    it('should check if value is within enum.', () => {
        const props = makeProps({type: 'enum', enum: {1: 'One', 2: 'Two'}});
        expect(() => props.prepareProperties({prop: 3})).toThrowError();
        expect(props.prepareProperties({prop: 2}).prop).toBe(2);
    });
});

describe('DocRef property.', () => {
    it('should check if value has property uid.', () => {
        const props = makeProps({type: 'doc_ref', refModel: User, refProperty: 'name'});
        expect(() => props.prepareProperties({prop: {label: 'name'}})).toThrowError();
        expect(props.prepareProperties({prop: {label: 'name', uid: 'a'}})).toBeDefined();
    });
});

describe('Array property.', () => {
    it('should check the value maxs and mins.', () => {
        const props = makeProps({type: 'array', max: 4, min: 2});
        expect(() => props.prepareProperties({prop: ['a']})).toThrowError();
        expect(() => props.prepareProperties({prop: ['a', 'b', 'c', 'd', 'e']})).toThrowError();
        expect(props.prepareProperties({prop: ['a', 'b', 'c']})).toBeDefined();
    });
});

describe('Map property.', () => {
    it('should check the value maxs and mins.', () => {
        const props = makeProps({type: 'map', max: 2, min: 1});
        expect(() => props.prepareProperties({prop: {}})).toThrowError();
        expect(() => props.prepareProperties({prop: {1: 'a', 2: 'b', 3: 'c'}})).toThrowError();
        expect(props.prepareProperties({prop: {1: 'a', 2: 'b'}})).toBeDefined();
    });
});
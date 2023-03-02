import ModelValidationError from "../../errors/model_validation_error";
import round from "../../utils/round";
import useValidate from "../../utils/use_validate";
import DocRef from "../doc_ref";
import Model from "../model";
import { ArrayModelProperty, BooleanModelProperty, DateModelProperty, DocRefModelProperty, EnumModelProperty, MapModelProperty, ModelPropertiesList, ModelPropertyTypes, NumberModelProperty, StringModelProperty, ModelMapProp } from "../model_property";

export default class ModelProperties{
    properties: ModelPropertiesList;

    constructor(properties: ModelPropertiesList){
        this.properties = properties;
    }

    prepareProperties(data: any){
        
    }

    protected prepareProperty(currentValue: any, prop: ModelPropertyTypes){
        if(currentValue === undefined || currentValue === null){
            if(prop.default !== undefined){
                currentValue = prop.default;
            }
            else if(prop.required){
                throw new ModelValidationError('PROPERTY_UNDEFINED');
            }
            else{
                return null;
            }
        }

        
        switch(prop.type){
            case "string": return this.prepareStringProperty(currentValue, prop);
            case "number": return this.prepareNumberProperty(currentValue, prop);
            case "boolean": return this.prepareBooleanProperty(currentValue, prop);
            case "date": return this.prepareDateProperty(currentValue, prop);
            case "doc_ref": return this.prepareDocRefProperty(currentValue, prop);
            case "enum": return this.prepareEnumProperty(currentValue, prop);
            case "map": return this.prepareMapProperty(currentValue, prop);
            case "array": return this.prepareArrayProperty(currentValue, prop);
            default: throw new ModelValidationError('UNIMPLEMENTED_TYPE');
        }
    }

    protected prepareStringProperty(currentValue: string, prop: StringModelProperty){
        switch(prop.casing){
            case "lower": currentValue = currentValue.toLowerCase(); break;
            case "upper": currentValue = currentValue.toUpperCase(); break;
        }

        if(prop.max && currentValue.length > prop.max){
            throw new ModelValidationError('MAX_LENGTH_REACHED', {max: prop.max});
        }
        if(prop.min && currentValue.length < prop.min){
            throw new ModelValidationError('MIN_LENGTH_UNREACHED', {min: prop.min});
        }

        useValidate(currentValue, prop);

        return currentValue;
    }

    protected prepareNumberProperty(currentValue: number, prop: NumberModelProperty){
        if(prop.max && currentValue > prop.max){
            throw new ModelValidationError('MAX_REACHED', {max: prop.max});
        }
        if(prop.min && currentValue < prop.min){
            throw new ModelValidationError('MIN_UNREACHED', {min: prop.min});
        }
        if(prop.maxFractionDigits){
            currentValue = round(currentValue, prop.maxFractionDigits);
        }

        useValidate(currentValue, prop);

        return currentValue;
    }

    protected prepareBooleanProperty(currentValue: boolean, prop: BooleanModelProperty){
        useValidate(currentValue, prop);

        return currentValue;
    }

    protected prepareDateProperty(currentValue: Date, prop: DateModelProperty){
        currentValue = new Date(currentValue);
        if(isNaN(currentValue.getTime())){
            throw new ModelValidationError('INVALID_VALUE');
        }
        if(prop.max && currentValue > prop.max){
            throw new ModelValidationError('MAX_REACHED', {max: prop.max});
        }
        if(prop.min && currentValue < prop.min){
            throw new ModelValidationError('MIN_UNREACHED', {min: prop.min});
        }

        useValidate(currentValue, prop);

        return currentValue;
    }

    protected prepareEnumProperty(currentValue: number, prop: EnumModelProperty){
        if(!(currentValue in prop.enum)){
            throw new ModelValidationError('INVALID_ENUM_VALUE', {enum: prop.enum});
        }

        useValidate(currentValue, prop);
        
        return currentValue;
    }

    protected prepareDocRefProperty(currentValue: DocRef<any>, prop: DocRefModelProperty){

        useValidate(currentValue, prop);

        return currentValue;
    }

    protected prepareArrayProperty(currentValue: [], prop: ArrayModelProperty){
        if(prop.max && currentValue.length > prop.max){
            throw new ModelValidationError('MAX_REACHED', {max: prop.max});
        }
        if(prop.min && currentValue.length < prop.min){
            throw new ModelValidationError('MIN_UNREACHED', {min: prop.min});
        }

        useValidate(currentValue, prop);

        return currentValue;
    }

    protected prepareMapProperty(currentValue: ModelMapProp, prop: MapModelProperty){
        const length = Object.keys(currentValue).length;
        if(prop.max && length > prop.max){
            throw new ModelValidationError('MAX_REACHED', {max: prop.max});
        }
        if(prop.min && length < prop.min){
            throw new ModelValidationError('MIN_UNREACHED', {min: prop.min});
        }

        useValidate(currentValue, prop);

        return currentValue;
    }
}
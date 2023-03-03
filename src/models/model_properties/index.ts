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
        const errors: {[key: string]: Error} = {};
        for(let [key, prop] of Object.entries(this.properties)){
            try{
                data[key] = this.prepareProperty(data[key], prop);
            }
            catch(err){
                errors[key] = <Error>err;
            }
        }

        if(Object.keys(errors).length > 0){
            throw new ModelValidationError('VALIDATION_ERROR', {errors, data});
        }

        return data;
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
                return undefined;
            }
        }

        
        switch(prop.type){
            case "string": currentValue = this.prepareStringProperty(currentValue, prop); break;
            case "number": currentValue = this.prepareNumberProperty(currentValue, prop); break;
            case "boolean": currentValue = this.prepareBooleanProperty(currentValue, prop); break;
            case "date": currentValue = this.prepareDateProperty(currentValue, prop); break;
            case "doc_ref": currentValue = this.prepareDocRefProperty(currentValue, prop); break;
            case "enum": currentValue = this.prepareEnumProperty(currentValue, prop); break;
            case "map": currentValue = this.prepareMapProperty(currentValue, prop); break;
            case "array": currentValue = this.prepareArrayProperty(currentValue, prop); break;
            default: throw new ModelValidationError('UNIMPLEMENTED_TYPE');
        }

        useValidate(currentValue, prop);

        return currentValue;
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

        return currentValue;
    }

    protected prepareBooleanProperty(currentValue: boolean, prop: BooleanModelProperty){
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

        return currentValue;
    }

    protected prepareEnumProperty(currentValue: number, prop: EnumModelProperty){
        if(!(currentValue in prop.enum)){
            throw new ModelValidationError('INVALID_ENUM_VALUE', {enum: prop.enum});
        }
        
        return currentValue;
    }

    protected prepareDocRefProperty(currentValue: DocRef<any>, prop: DocRefModelProperty){
        if(!currentValue.uid){
            throw new ModelValidationError('INVALID_DOCREF');
        }

        return currentValue;
    }

    protected prepareArrayProperty(currentValue: [], prop: ArrayModelProperty){
        if(prop.max && currentValue.length > prop.max){
            throw new ModelValidationError('MAX_REACHED', {max: prop.max});
        }
        if(prop.min && currentValue.length < prop.min){
            throw new ModelValidationError('MIN_UNREACHED', {min: prop.min});
        }

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

        return currentValue;
    }
}
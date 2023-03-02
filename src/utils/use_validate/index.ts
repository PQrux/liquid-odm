import ModelValidationError from "../../errors/model_validation_error";
import { ModelProperty } from "../../models/model_property";

export default function useValidate(value: any, modelProp: ModelProperty<any>){
    if(modelProp.validate){
        const result = modelProp.validate(value);
        if(result){
            throw new ModelValidationError(result);
        }
    }
}
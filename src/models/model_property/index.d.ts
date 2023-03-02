export type ModelMapProp = {[key: string]: unknown};

export interface ModelProperty<T>{
    type: string;
    required?: boolean;
    default?: T;
    validate?: (value: T) => string | undefined;
}

export interface ModelPropertyMinMax{
    min?: number | Date;
    max?: number | Date;
}

export interface StringModelProperty extends ModelProperty<string>, ModelPropertyMinMax{
    type: 'string';
    casing?: 'lower'|'upper';
}

export interface NumberModelProperty extends ModelProperty<number>, ModelPropertyMinMax{
    type: 'number';
    maxFractionDigits?: number;
}

export interface DateModelProperty extends ModelProperty<Date>, ModelPropertyMinMax{
    type: 'date';
}

export interface BooleanModelProperty extends ModelProperty<boolean>{
    type: 'boolean';
}

export interface EnumModelProperty extends ModelProperty<number>{
    type: 'enum';
    enum: {[key: number]: string};
}

export interface DocRefModelProperty<M extends Model<unknown> = Model<unknown>, LabelType = string> extends ModelProperty<DocRef<M>>{
    type: 'doc_ref';
    refModel: M;
    refProperty: string | ((doc: Model<unknown>) => LabelType);
}

export interface ArrayModelProperty extends ModelProperty<[]>, ModelPropertyMinMax{
    type: 'array';
}

export interface MapModelProperty extends ModelProperty<ModelMapProp>, ModelPropertyMinMax{
    type: 'map';
}

export type ModelPropertyTypes = StringModelProperty | 
    NumberModelProperty | 
    DateModelProperty | 
    BooleanModelProperty | 
    EnumModelProperty | 
    DocRefModelProperty | 
    ArrayModelProperty | 
    MapModelProperty
;


export type ModelPropertiesList = {[key: string]: ModelPropertyTypes};
import ModelProperties from "../model_properties";

export enum UIDModes{
    GUID = 1,
    INCREMENT = 2
}

export interface ModelConfigProps{
    ROOT_PATH: string;
    DESCRIPTORS: ModelProperties;
    UID_MODE?: UIDModes;
    WITH_DATES?: boolean;
}

export default class ModelConfig{
    readonly ROOT_PATH;
    readonly DESCRIPTORS;
    readonly UID_MODE;
    readonly WITH_DATES;

    constructor(props: ModelConfigProps){
        this.ROOT_PATH = props.ROOT_PATH;
        this.DESCRIPTORS = props.DESCRIPTORS;
        this.UID_MODE = props.UID_MODE || UIDModes.GUID;
        this.WITH_DATES = props.WITH_DATES;
    }
}
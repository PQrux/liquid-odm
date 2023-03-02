import Model from "../model";

export default class ModelList{
    public list: {[key: string]: Model<unknown>} = {};

    addModel(model: Model<unknown>){
        this.list[model.MODEL_CONFIG.ROOT_PATH] = model;
    }
}
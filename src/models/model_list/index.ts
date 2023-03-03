import { Class } from "utility-types";
import Model from "../model";

export default class ModelList{
    public list: {[key: string]: Class<Model<unknown>>} = {};

    addModel(model: Class<Model<unknown>>){
        this.list[model.prototype.getModelConfig().ROOT_PATH] = model;
    }
}
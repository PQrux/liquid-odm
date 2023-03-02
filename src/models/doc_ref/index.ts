import Model from "../model";

export default class DocRef<M extends Model<unknown>, LabelType = string>{
    public uid;
    public label;

    constructor(uid: string, label: LabelType){
        this.uid = uid;
        this.label = label;
    }
}
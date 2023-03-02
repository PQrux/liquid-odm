import NoPathError from "../../errors/no_path_error";
import ModelConfig from "../model_config";
import { PickByValueExact } from 'utility-types';
import DocRef from "../doc_ref";
import { DocRefModelProperty } from "../model_property";


export interface DatedProps{
    _exc?: boolean;
    updAt: EpochTimeStamp;
    crtAt: EpochTimeStamp;
}

export default abstract class Model<Props>{
    public path?: string;
    protected data: Props = <Props>{};
    public abstract getModelConfig(): ModelConfig;

    public get MODEL_CONFIG(){
        return this.getModelConfig();
    }

    public get UID(){
        return this.path?.split("/").pop();
    }

    public set setUID(basePath: string){
        this.path = `${this.MODEL_CONFIG.ROOT_PATH}/${basePath.split("/").pop()||undefined}`;
    }

    constructor(path?: string, data?: Props){
        this.path = path;
        if(data) this.data = data;
    }

    setRef<M extends Model<any>>(prop: keyof PickByValueExact<Props, DocRef<M>>, doc: M){
        if(!doc.UID) throw new NoPathError('REFERENCE_HAS_NO_PATH');
        let label: any;
        const modelProp = <DocRefModelProperty>this.MODEL_CONFIG.DESCRIPTORS.properties[prop];
        if(typeof modelProp.refProperty === 'string'){
            label = doc.data[modelProp.refProperty];
        }
        else{
            label = modelProp.refProperty(doc);
        }
        const ref = new DocRef<M>(doc.UID, label);
        this.data[prop] = <any>ref;

        return ref;
    }
}
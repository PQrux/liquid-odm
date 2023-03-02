import Model from "../model";
import ModelList from "../model_list";
import { Class } from "utility-types";

export interface SelectOptions{
    property: string;
    equalTo?: any;
    lessThan?: any;
    greaterThan?: any;
    limit?: number;
}

export interface SelectResponse<T>{
    list: T[];
}

export interface ExtendModel extends Model<unknown>{};

export default abstract class DBConnector<TConnection>{
    protected modelList: ModelList;
    protected connection: TConnection;

    constructor(modelList: ModelList, connection: TConnection){
        this.modelList = modelList;
        this.connection = connection;
    }

    public abstract select<M extends ExtendModel>(model: Class<M>, options: SelectOptions[]): SelectResponse<M>;

    public abstract selectOne<M extends ExtendModel>(model: Class<M>, options: SelectOptions[]): SelectResponse<M>;

    public abstract pick<M extends ExtendModel>(model: Class<M>, uid: string): M | undefined;

    public abstract pickChild<ReturnType>(uid: string, child: string): ReturnType | undefined;

    public abstract generateUID<M extends ExtendModel>(document: M): string | number;

    public abstract insert<M extends ExtendModel>(document: M): M;

    public abstract delete<M extends ExtendModel>(document: M): void;

    public abstract transaction<M extends ExtendModel>(document: M, handler: (current: M) => M): {sucess: boolean, current: M};
}
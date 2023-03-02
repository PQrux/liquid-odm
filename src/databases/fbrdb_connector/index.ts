import { Class } from "utility-types";
import DBConnector, { ExtendModel, SelectOptions, SelectResponse } from "../../models/db_connector";

export default class FBRDBConnector extends DBConnector<any>{
    public select<M extends ExtendModel>(model: Class<M>, options: SelectOptions[]): SelectResponse<M> {
        throw new Error("Method not implemented.");
    }
    public selectOne<M extends ExtendModel>(model: Class<M>, options: SelectOptions[]): SelectResponse<M> {
        throw new Error("Method not implemented.");
    }
    public pick<M extends ExtendModel>(model: Class<M>, uid: string): M | undefined {
        throw new Error("Method not implemented.");
    }
    public pickChild<ReturnType>(uid: string, child: string): ReturnType | undefined {
        throw new Error("Method not implemented.");
    }
    public generateUID<M extends ExtendModel>(document: M): string | number {
        throw new Error("Method not implemented.");
    }
    public insert<M extends ExtendModel>(document: M): M {
        throw new Error("Method not implemented.");
    }
    public delete<M extends ExtendModel>(document: M): void {
        throw new Error("Method not implemented.");
    }
    public transaction<M extends ExtendModel>(document: M, handler: (current: M) => M): { sucess: boolean; current: M; } {
        throw new Error("Method not implemented.");
    }

}
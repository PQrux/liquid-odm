import { DocRef, Model, ModelConfig, ModelProperties } from "../../../src";

export interface UserProps{
    name: string;
    points: number;
    active: boolean;
    birthDate: Date;
    manager?: DocRef<User>;
    level: number;
    activities?: {[key: string]: string};
    colors?: string[];
}

export class User extends Model<UserProps>{
    public getModelConfig(){
        return UserModelConfig;
    }
}

export const UserModelConfig = new ModelConfig({
    ROOT_PATH: 'User',
    PROPERTIES: new ModelProperties({
        "name": { type: 'string', required: true, casing: 'upper' },
        "points": { type: "number", required: true, default: 0 },
        "active": { type: "boolean", required: true },
        "birthDate": { type: "date", required: true },
        "manager": { type: "doc_ref", refModel: User, refProperty: 'name', required: false },
        "level": { type: "enum", enum: {1: 'Manager', 2: 'Treinee'}, required: true },
        "activities": { type: "map", required: false },
        "colors": { type: "array", max: 2, min: 1, required: false },
    })
});

export const generateUsers = () => ([
    new User('User/a', {
        name: 'Herbert Richards',
        active: true,
        birthDate: new Date(2000, 4, 1),
        points: 30,
        level: 1,
    }),
    new User('User/a', {
        name: 'Irlac Johnsons',
        active: true,
        birthDate: new Date(1995, 5, 10),
        points: 150,
        level: 1,
    }),
    new User('User/a', {
        name: 'Catherine Armanda',
        active: false,
        birthDate: new Date(1990, 10, 12),
        points: 3,
        manager: {label: 'Irlac Johnsons', uid: 'b'},
        level: 2,
    })
])



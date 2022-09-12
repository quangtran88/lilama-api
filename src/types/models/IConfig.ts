import { IBase } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface IConfig extends IBase {
    key: string;
    value: string;
}

export interface IConfigDocument extends IConfig {}

export interface IConfigModel extends Model<IConfig>, PaginateModel<IConfig> {}

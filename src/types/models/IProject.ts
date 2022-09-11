import { IBase } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface IProject extends IBase {
    code: string;
    description: string;
    need_review?: boolean;
}

export interface IProjectModel extends Model<IProject>, PaginateModel<IProject> {}

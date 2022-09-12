import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface IProject extends IBase<IProject> {
    code: string;
    description: string;
    need_review?: boolean;
}

export interface IProjectUpload extends IProject {}

export interface IProjectDocument extends IProject {}

export interface IProjectUploadDocument extends IUpload<IProjectUpload> {}

export interface IProjectModel extends Model<IProject>, PaginateModel<IProject> {}

export interface IProjectUploadModel extends Model<IUpload<IProject>>, PaginateModel<IUpload<IProject>> {}

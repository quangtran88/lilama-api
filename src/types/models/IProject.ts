import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface IProject extends IBase<IProject> {
    code: string;
    description: string;
    need_review?: boolean;
}
export interface IProjectDocument extends IProject {}
export interface IProjectModel extends Model<IProject>, PaginateModel<IProject> {}

export interface IProjectUpload extends IProject {}
export interface IProjectUploadDocument extends IUpload<IProjectUpload> {}
export interface IProjectUploadModel extends Model<IProjectUploadDocument>, PaginateModel<IProjectUploadDocument> {}

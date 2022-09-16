import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface IManager extends IBase<IManager> {
    code: string;
    info: string;
    need_review?: boolean;
}
export interface IManagerDocument extends IManager {}
export interface IManagerModel extends Model<IManagerDocument>, PaginateModel<IManagerDocument> {}

export interface IManagerUpload extends IManager {}
export interface IManagerUploadDocument extends IUpload<IManagerUpload> {}
export interface IManagerUploadModel extends Model<IManagerUploadDocument>, PaginateModel<IManagerUploadDocument> {}

import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface ICostType extends IBase<ICostType> {
    code: string;
    name?: string;
    note?: string;
    need_review?: boolean;
}
export interface ICostTypeDocument extends ICostType {}
export interface ICostTypeModel extends Model<ICostType>, PaginateModel<ICostType> {}

export interface ICostTypeUpload extends ICostType {}
export interface ICostTypeUploadDocument extends IUpload<ICostTypeUpload> {}
export interface ICostTypeUploadModel extends Model<ICostTypeUploadDocument>, PaginateModel<ICostTypeUploadDocument> {}

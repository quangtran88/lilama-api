import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface ICostType extends IBase<ICostType> {
    code: string;
    name: string;
    description: string;
}
export interface ICostTypeDocument extends ICostType {}
export interface ICostTypeModel extends Model<ICostTypeDocument>, PaginateModel<ICostTypeDocument> {}

export interface ICostTypeUpload extends ICostType {}
export interface ICostTypeUploadDocument extends IUpload<ICostTypeUpload> {}
export interface ICostTypeUploadModel extends Model<ICostTypeUploadDocument>, PaginateModel<ICostTypeUploadDocument> {}

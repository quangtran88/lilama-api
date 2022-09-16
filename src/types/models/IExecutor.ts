import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface IExecutor extends IBase<IExecutor> {
    code: string;
    info: string;
    need_review?: boolean;
}
export interface IExecutorDocument extends IExecutor {}
export interface IExecutorModel extends Model<IExecutorDocument>, PaginateModel<IExecutorDocument> {}

export interface IExecutorUpload extends IExecutor {}
export interface IExecutorUploadDocument extends IUpload<IExecutorUpload> {}
export interface IExecutorUploadModel extends Model<IExecutorUploadDocument>, PaginateModel<IExecutorUploadDocument> {}

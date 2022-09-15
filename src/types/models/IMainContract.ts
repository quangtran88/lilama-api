import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export interface IMainContract extends IBase<IMainContract> {
    code: string;
    value?: number;
    description?: string;
    signed_at?: Date;
    need_review?: boolean;
    binding_package: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    customer: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    project: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
}
export interface IMainContractDocument extends IMainContract {}
export interface IMainContractModel extends Model<IMainContractDocument>, PaginateModel<IMainContractDocument> {}

export interface IMainContractUpload extends IBase {
    code: string;
    binding_package_code: string;
    project_code: string;
    customer_code: string;
    value?: number;
    description?: string;
    signed_at?: Date;
}
export interface IMainContractUploadDocument extends IUpload<IMainContractUpload> {}
export interface IMainContractUploadModel
    extends Model<IMainContractUploadDocument>,
        PaginateModel<IMainContractUploadDocument> {}

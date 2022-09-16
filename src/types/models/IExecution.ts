import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export interface IExecution extends IBase<IExecution> {
    freelance_contract: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    cost_type: {
        _id: Types.ObjectId;
        code: string;
        name: string;
    };
    payment_request_code?: string;
    payment_request_date?: Date;
    payment_request_note?: string;
    payment_request_value?: number;
    expense_date?: Date;
    document_codes?: string;
    document_dates?: string;
    vendor?: string;
    marking?: string;
}
export interface IExecutionDocument extends IExecution {}
export interface IExecutionModel extends Model<IExecutionDocument>, PaginateModel<IExecutionDocument> {}

export interface IExecutionUpload extends IBase {
    freelance_contract_code: string;
    cost_type_code: string;
    payment_request_code?: string;
    payment_request_date?: Date;
    payment_request_note?: string;
    payment_request_value?: number;
    expense_date?: Date;
    document_codes?: string;
    document_dates?: string;
    vendor?: string;
    marking?: string;
}
export interface IExecutionUploadDocument extends IUpload<IExecutionUpload> {}
export interface IExecutionUploadModel
    extends Model<IExecutionUploadDocument>,
        PaginateModel<IExecutionUploadDocument> {}

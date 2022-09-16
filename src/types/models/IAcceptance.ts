import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export interface IAcceptance extends IBase<IAcceptance> {
    freelance_contract: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    description?: string;
    execution_value?: number;
    acceptance_value?: number;
    invoice_date?: Date;
    new_distributed_value?: number;
    remaining_value?: number;
}
export interface IAcceptanceDocument extends IAcceptance {}
export interface IAcceptanceModel extends Model<IAcceptanceDocument>, PaginateModel<IAcceptanceDocument> {}

export interface IAcceptanceUpload extends IBase {
    freelance_contract_code: string;
    description?: string;
    execution_value?: number;
    acceptance_value?: number;
    invoice_date?: Date;
    new_distributed_value?: number;
}
export interface IAcceptanceUploadDocument extends IUpload<IAcceptanceUpload> {}
export interface IAcceptanceUploadModel
    extends Model<IAcceptanceUploadDocument>,
        PaginateModel<IAcceptanceUploadDocument> {}

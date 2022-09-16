import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export interface IBudget extends IBase<IBudget> {
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
    description?: string;
    value?: number;
}
export interface IBudgetDocument extends IBudget {}
export interface IBudgetModel extends Model<IBudgetDocument>, PaginateModel<IBudgetDocument> {}

export interface IBudgetUpload extends IBase {
    freelance_contract_code: string;
    cost_type_code: string;
    description?: string;
    value?: number;
}
export interface IBudgetUploadDocument extends IUpload<IBudgetUpload> {}
export interface IBudgetUploadModel extends Model<IBudgetUploadDocument>, PaginateModel<IBudgetUploadDocument> {}

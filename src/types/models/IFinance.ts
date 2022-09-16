import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export interface IFinance extends IBase<IFinance> {
    main_contract: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    mc_value?: number;
    contract_distributed_value?: number;
    contract_execution_value?: number;
    contract_retention_value?: number;
    contract_year?: number;
    contract_rate?: number;
    contract_final_value?: number;
    contract_net_profit?: number;
    settlement_distributed_value?: number;
    settlement_execution_value?: number;
    settlement_retention_value?: number;
    settlement_year?: number;
    settlement_rate?: number;
    settlement_final_value?: number;
    settlement_net_profit?: number;
}
export interface IFinanceDocument extends IFinance {}
export interface IFinanceModel extends Model<IFinanceDocument>, PaginateModel<IFinanceDocument> {}

export interface IFinanceUpload extends IBase {
    main_contract_code: string;
    mc_value?: number;
    contract_distributed_value?: number;
    contract_execution_value?: number;
    contract_year?: number;
    contract_rate?: number;
    settlement_distributed_value?: number;
    settlement_execution_value?: number;
    settlement_year?: number;
    settlement_rate?: number;
}
export interface IFinanceUploadDocument extends IUpload<IFinanceUpload> {}
export interface IFinanceUploadModel extends Model<IFinanceUploadDocument>, PaginateModel<IFinanceUploadDocument> {}

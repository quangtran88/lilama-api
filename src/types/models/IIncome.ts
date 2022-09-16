import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export interface IIncome extends IBase<IIncome> {
    main_contract: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    acceptance_note?: string;
    acceptance_value?: number;
    invoice_code?: string;
    invoice_date?: Date;
    vat_10?: number;
    vat_8?: number;
    taxable_value?: number;
    payment_request_code?: string;
    payment_request_date?: Date;
    payment_request_value?: number;
    advance_refund_value?: number;
    retention_value?: number;
    received_date?: Date;
    received_value?: number;
    deduction_value?: number;
    is_advance_payment: boolean;
    note?: string;
    remaining_advance_refund?: number;
    payment_request_debt?: number;
}
export interface IIncomeDocument extends IIncome {}
export interface IIncomeModel extends Model<IIncomeDocument>, PaginateModel<IIncomeDocument> {}

export interface IIncomeUpload extends IBase {
    main_contract_code: string;
    acceptance_note?: string;
    acceptance_value?: number;
    invoice_code?: string;
    invoice_date?: Date;
    vat_10?: number;
    vat_8?: number;
    taxable_value?: number;
    payment_request_code?: string;
    payment_request_date?: Date;
    payment_request_value?: number;
    advance_refund_value?: number;
    retention_value?: number;
    received_date?: Date;
    received_value?: number;
    deduction_value?: number;
    note?: string;
}
export interface IIncomeUploadDocument extends IUpload<IIncomeUpload> {}
export interface IIncomeUploadModel extends Model<IIncomeUploadDocument>, PaginateModel<IIncomeUploadDocument> {}

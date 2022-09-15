import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IIncome,
    IIncomeDocument,
    IIncomeModel,
    IIncomeUpload,
    IIncomeUploadDocument,
    IIncomeUploadModel,
} from "../types/models/IIncome";
import { model, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

const IncomeSchema = generateSchema<IIncome>({
    main_contract: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    acceptance_note: String,
    acceptance_value: Number,
    invoice_code: String,
    invoice_date: Date,
    vat_10: Number,
    vat_8: Number,
    taxable_value: Number,
    payment_request_code: String,
    payment_request_date: Date,
    payment_request_value: Number,
    advance_refund_value: Number,
    retention_value: Number,
    received_date: Number,
    received_value: Number,
    deduction_value: Number,
    note: String,
    is_advance_payment: Boolean,
    remaining_advance_refund: Number,
    payment_request_debt: Number,
});

IncomeSchema.plugin(paginate);

IncomeSchema.index({ code: 1 }, { unique: true });
IncomeSchema.index({ "main_contract.code": 1, created_at: -1 });

export const IncomeModel = model<IIncomeDocument, IIncomeModel>("Income", IncomeSchema);

const IIncomeUploadSchema = generateUploadSchema<IIncomeUpload>({
    main_contract_code: String,
    acceptance_note: String,
    acceptance_value: Number,
    invoice_code: String,
    invoice_date: Date,
    vat_10: Number,
    vat_8: Number,
    taxable_value: Number,
    payment_request_code: String,
    payment_request_date: Date,
    payment_request_value: Number,
    advance_refund_value: Number,
    retention_value: Number,
    received_date: Number,
    received_value: Number,
    deduction_value: Number,
    note: String,
});

IIncomeUploadSchema.plugin(paginate);

export const IncomeUploadModel = model<IIncomeUploadDocument, IIncomeUploadModel>(
    "IncomeUpload",
    IIncomeUploadSchema,
    "income_uploads"
);

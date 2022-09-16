import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IExecution,
    IExecutionDocument,
    IExecutionModel,
    IExecutionUpload,
    IExecutionUploadDocument,
    IExecutionUploadModel,
} from "../types/models/IExecution";
import { model, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

const ExecutionSchema = generateSchema<IExecution>({
    freelance_contract: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    cost_type: {
        _id: Types.ObjectId,
        code: String,
        name: String,
    },
    payment_request_code: String,
    payment_request_date: Date,
    payment_request_note: String,
    payment_request_value: Number,
    expense_date: Date,
    document_codes: String,
    document_dates: String,
    vendor: String,
    marking: String,
});

ExecutionSchema.plugin(paginate);

ExecutionSchema.index({ "freelance_contract.code": 1, created_at: -1 });
ExecutionSchema.index({ "cost_type.code": 1, created_at: -1 });

export const ExecutionModel = model<IExecutionDocument, IExecutionModel>("Execution", ExecutionSchema);

const IExecutionUploadSchema = generateUploadSchema<IExecutionUpload>({
    freelance_contract_code: String,
    cost_type_code: String,
    payment_request_code: String,
    payment_request_date: Date,
    payment_request_note: String,
    payment_request_value: Number,
    expense_date: Date,
    document_codes: String,
    document_dates: String,
    vendor: String,
    marking: String,
});

IExecutionUploadSchema.plugin(paginate);

export const ExecutionUploadModel = model<IExecutionUploadDocument, IExecutionUploadModel>(
    "ExecutionUpload",
    IExecutionUploadSchema,
    "execution_uploads"
);

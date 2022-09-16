import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IAcceptance,
    IAcceptanceDocument,
    IAcceptanceModel,
    IAcceptanceUpload,
    IAcceptanceUploadDocument,
    IAcceptanceUploadModel,
} from "../types/models/IAcceptance";
import { model, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

const AcceptanceSchema = generateSchema<IAcceptance>({
    freelance_contract: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    description: String,
    execution_value: Number,
    acceptance_value: Number,
    invoice_date: Date,
    new_distributed_value: Number,
    remaining_value: Number,
});

AcceptanceSchema.plugin(paginate);

AcceptanceSchema.index({ "freelance_contract.code": 1, created_at: -1 });

export const AcceptanceModel = model<IAcceptanceDocument, IAcceptanceModel>("Acceptance", AcceptanceSchema);

const IAcceptanceUploadSchema = generateUploadSchema<IAcceptanceUpload>({
    freelance_contract_code: String,
    description: String,
    execution_value: Number,
    acceptance_value: Number,
    invoice_date: Date,
    new_distributed_value: Number,
});

IAcceptanceUploadSchema.plugin(paginate);

export const AcceptanceUploadModel = model<IAcceptanceUploadDocument, IAcceptanceUploadModel>(
    "AcceptanceUpload",
    IAcceptanceUploadSchema,
    "acceptance_uploads"
);

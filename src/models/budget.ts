import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IBudget,
    IBudgetDocument,
    IBudgetModel,
    IBudgetUpload,
    IBudgetUploadDocument,
    IBudgetUploadModel,
} from "../types/models/IBudget";
import { model, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

const BudgetSchema = generateSchema<IBudget>({
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
    description: String,
    value: Number,
});

BudgetSchema.plugin(paginate);

BudgetSchema.index({ "freelance_contract.code": 1, created_at: -1 });
BudgetSchema.index({ "cost_type.code": 1, created_at: -1 });

export const BudgetModel = model<IBudgetDocument, IBudgetModel>("Budget", BudgetSchema);

const IBudgetUploadSchema = generateUploadSchema<IBudgetUpload>({
    freelance_contract_code: String,
    cost_type_code: String,
    description: String,
    value: Number,
});

IBudgetUploadSchema.plugin(paginate);

export const BudgetUploadModel = model<IBudgetUploadDocument, IBudgetUploadModel>(
    "BudgetUpload",
    IBudgetUploadSchema,
    "budget_uploads"
);

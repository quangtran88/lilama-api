import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    ICostType,
    ICostTypeDocument,
    ICostTypeModel,
    ICostTypeUpload,
    ICostTypeUploadDocument,
    ICostTypeUploadModel,
} from "../types/models/ICostType";
import { model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const CostTypeSchema = generateSchema<ICostType>({
    code: String,
    name: String,
    note: String,
    need_review: Boolean,
});

CostTypeSchema.plugin(paginate);

CostTypeSchema.index({ code: 1 }, { unique: true });

export const CostTypeModel = model<ICostTypeDocument, ICostTypeModel>("cost_types", CostTypeSchema);

const CostTypeUploadSchema = generateUploadSchema<ICostTypeUpload>({
    code: { type: String, unique: true },
    name: String,
    note: String,
});
export const CostTypeUploadModel = model<ICostTypeUploadDocument, ICostTypeUploadModel>(
    "CostTypeUpload",
    CostTypeUploadSchema,
    "cost_type_uploads"
);

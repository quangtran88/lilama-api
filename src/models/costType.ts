import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    ICostType,
    ICostTypeDocument,
    ICostTypeModel,
    ICostTypeUpload,
    ICostTypeUploadDocument,
    ICostTypeUploadModel,
} from "../types/models/ICostType";
import paginate from "mongoose-paginate-v2";
import { model } from "mongoose";

const CostTypeSchema = generateSchema<ICostType>({
    code: String,
    name: String,
    description: String,
});

CostTypeSchema.plugin(paginate);

CostTypeSchema.index({ code: 1 });

export const CostTypeModel = model<ICostTypeDocument, ICostTypeModel>("CostType", CostTypeSchema, "cost_types");

const CostTypeUploadSchema = generateUploadSchema<ICostTypeUpload>({
    code: String,
    name: String,
    description: String,
});

CostTypeUploadSchema.plugin(paginate);

export const CostTypeUploadModel = model<ICostTypeUploadDocument, ICostTypeUploadModel>(
    "CostTypeUpload",
    CostTypeUploadSchema,
    "cost_type_uploads"
);

import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IManager,
    IManagerDocument,
    IManagerModel,
    IManagerUpload,
    IManagerUploadDocument,
    IManagerUploadModel,
} from "../types/models/IManager";
import paginate from "mongoose-paginate-v2";
import { model } from "mongoose";

const ManagerSchema = generateSchema<IManager>({
    code: String,
    info: String,
    need_review: Boolean,
});

ManagerSchema.plugin(paginate);

ManagerSchema.index({ code: 1 });

export const ManagerModel = model<IManagerDocument, IManagerModel>("Manager", ManagerSchema);

const ManagerUploadSchema = generateUploadSchema<IManagerUpload>({
    code: String,
    info: String,
});

ManagerUploadSchema.plugin(paginate);

export const ManagerUploadModel = model<IManagerUploadDocument, IManagerUploadModel>(
    "ManagerUpload",
    ManagerUploadSchema,
    "manager_uploads"
);

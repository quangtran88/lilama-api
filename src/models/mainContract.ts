import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IMainContract,
    IMainContractDocument,
    IMainContractModel,
    IMainContractUpload,
    IMainContractUploadDocument,
    IMainContractUploadModel,
} from "../types/models/IMainContract";
import paginate from "mongoose-paginate-v2";
import { model, Types } from "mongoose";

const MainContractSchema = generateSchema<IMainContract>({
    code: String,
    value: Number,
    description: String,
    signed_at: Date,
    need_review: Boolean,
    binding_package: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    customer: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    project: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
});

MainContractSchema.plugin(paginate);

MainContractSchema.index({ code: 1 }, { unique: true });
MainContractSchema.index({ "project.code": 1 });
MainContractSchema.index({ "customer.code": 1 });
MainContractSchema.index({ "binding_package.code": 1 });

export const MainContractModel = model<IMainContractDocument, IMainContractModel>(
    "MainContract",
    MainContractSchema,
    "main_contracts"
);

const MainContractUploadSchema = generateUploadSchema<IMainContractUpload>({
    code: String,
    binding_package_code: String,
    project_code: String,
    customer_code: String,
    value: Number,
    description: String,
    signed_at: Date,
});

MainContractUploadSchema.plugin(paginate);

export const MainContractUploadModel = model<IMainContractUploadDocument, IMainContractUploadModel>(
    "MainContractUpload",
    MainContractUploadSchema,
    "main_contract_uploads"
);

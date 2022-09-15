import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IBindingPackage,
    IBindingPackageDocument,
    IBindingPackageModel,
    IBindingPackageUpload,
    IBindingPackageUploadDocument,
    IBindingPackageUploadModel,
} from "../types/models/IBindingPackage";
import paginate from "mongoose-paginate-v2";
import { model, Types } from "mongoose";

const BindingPackageSchema = generateSchema<IBindingPackage>({
    code: String,
    description: String,
    need_review: Boolean,
    project: {
        _id: Types.ObjectId,
        need_review: Boolean,
        code: String,
    },
});

const BindingPackageUploadSchema = generateUploadSchema<IBindingPackageUpload>({
    project_code: String,
    code: String,
    description: String,
});

BindingPackageSchema.plugin(paginate);

BindingPackageSchema.index({ code: 1 });
BindingPackageSchema.index({ "project.code": 1 });

export const BindingPackageModel = model<IBindingPackageDocument, IBindingPackageModel>(
    "BindingPackage",
    BindingPackageSchema,
    "binding_packages"
);

export const BindingPackageUploadModel = model<IBindingPackageUploadDocument, IBindingPackageUploadModel>(
    "BindingPackageUpload",
    BindingPackageUploadSchema,
    "binding_package_uploads"
);

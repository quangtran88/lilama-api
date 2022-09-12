import { generateSchema } from "../utils/mongo";
import { IBindingPackage, IBindingPackageDocument, IBindingPackageModel } from "../types/models/IBindingPackage";
import { IProject } from "../types/models/IProject";
import paginate from "mongoose-paginate-v2";
import { model } from "mongoose";

const RelProjectSchema = generateSchema<IProject>({
    need_review: Boolean,
    code: String,
});

const BindingPackageSchema = generateSchema<IBindingPackage>({
    code: String,
    description: String,
    project: RelProjectSchema,
});

BindingPackageSchema.plugin(paginate);

BindingPackageSchema.index({ code: 1 });
BindingPackageSchema.index({ "project.code": 1 });

export const BindingPackageModel = model<IBindingPackageDocument, IBindingPackageModel>(
    "BindingPackage",
    BindingPackageSchema,
    "binding_packages"
);

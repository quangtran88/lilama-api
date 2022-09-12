import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";
import { IProjectUploadDocument } from "./IProject";

export interface IBindingPackage extends IBase<IBindingPackage> {
    code: string;
    description: string;
    need_review?: boolean;
    project: {
        code: string;
        need_review?: boolean;
    };
}
export interface IBindingPackageDocument extends IBindingPackage {}
export interface IBindingPackageModel extends Model<IBindingPackage>, PaginateModel<IBindingPackage> {}

export interface IBindingPackageUpload extends IBase {
    project_code: string;
    code: string;
    description: string;
}
export interface IBindingPackageUploadDocument extends IUpload<IBindingPackageUpload> {}
export interface IBindingPackageUploadModel
    extends Model<IProjectUploadDocument>,
        PaginateModel<IProjectUploadDocument> {}

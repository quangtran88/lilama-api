import { IBase } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export interface IBindingPackage extends IBase<IBindingPackage> {
    code: string;
    description: string;
    project: {
        _id: Types.ObjectId;
        need_review?: boolean;
        code: string;
    };
}

export interface IBindingPackageDocument extends IBindingPackage {}

export interface IBindingPackageModel extends Model<IBindingPackage>, PaginateModel<IBindingPackage> {}

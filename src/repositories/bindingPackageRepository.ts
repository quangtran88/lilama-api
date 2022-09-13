import { BaseRepository } from "./baseRepository";
import {
    IBindingPackage,
    IBindingPackageModel,
    IBindingPackageUpload,
    IBindingPackageUploadModel,
} from "../types/models/IBindingPackage";
import { BindingPackageModel, BindingPackageUploadModel } from "../models/bindingPackage";
import { ClientSession } from "mongoose";

class BindingPackageRepository extends BaseRepository<
    IBindingPackage,
    IBindingPackageModel,
    IBindingPackageUpload,
    IBindingPackageUploadModel
> {
    constructor() {
        super(BindingPackageModel, BindingPackageUploadModel);
    }

    async findByCode(code: IBindingPackage["code"]) {
        return this.findFirst({ code });
    }

    async insert(data: Partial<IBindingPackage>, createdBy: string, session?: ClientSession): Promise<IBindingPackage> {
        return super.insert({ ...data, need_review: true }, createdBy, session);
    }
}

export default new BindingPackageRepository();

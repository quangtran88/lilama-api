import { BaseRepository } from "./baseRepository";
import {
    IBindingPackage,
    IBindingPackageModel,
    IBindingPackageUpload,
    IBindingPackageUploadModel,
} from "../types/models/IBindingPackage";
import { BindingPackageModel, BindingPackageUploadModel } from "../models/bindingPackage";

class BindingPackageRepository extends BaseRepository<IBindingPackage,
    IBindingPackageModel,
    IBindingPackageUpload,
    IBindingPackageUploadModel> {
    constructor() {
        super(BindingPackageModel, BindingPackageUploadModel);
    }

    async findByCode(code: IBindingPackage["code"]) {
        return this.findFirst({ code });
    }
}

export default new BindingPackageRepository();

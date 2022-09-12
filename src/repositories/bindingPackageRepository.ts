import { BaseRepository } from "./baseRepository";
import { IBindingPackage, IBindingPackageModel } from "../types/models/IBindingPackage";
import { BindingPackageModel } from "../models/bindingPackage";

class BindingPackageRepository extends BaseRepository<IBindingPackage, IBindingPackageModel> {
    constructor() {
        super(BindingPackageModel);
    }

    async findByCode(code: IBindingPackage["code"]) {
        return this.findFirst({ code });
    }
}

export default new BindingPackageRepository();

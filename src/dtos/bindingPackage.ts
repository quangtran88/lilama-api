import { BaseResultDTO } from "./base";
import { IBindingPackage } from "../types/models/IBindingPackage";
import { mapId } from "../utils/dto";

export class BindingPackageResultDTO extends BaseResultDTO {
    code: string;
    project: {
        id: string;
        code: string;
        need_review?: boolean;
    };
    description?: string;
    need_review?: boolean;

    constructor(bindingPackage: IBindingPackage) {
        super(bindingPackage);
        this.code = bindingPackage.code;
        this.description = bindingPackage.description;
        this.need_review = bindingPackage.need_review;
        this.project = mapId(bindingPackage.project);
    }
}

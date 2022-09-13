import { BaseResultDTO } from "./base";
import { IBindingPackage } from "../types/models/IBindingPackage";

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

        const project = bindingPackage.project;
        this.project = {
            id: project._id.toString(),
            code: project.code,
            need_review: project.need_review,
        };
    }
}

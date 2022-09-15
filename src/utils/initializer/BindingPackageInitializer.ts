import { Initializer } from "./Initializer";
import { IBindingPackage } from "../../types/models/IBindingPackage";
import bindingPackageRepository from "../../repositories/bindingPackageRepository";
import { ClientSession } from "mongoose";
import { ObjectId } from "../mongo";
import { BindingPackageResultDTO } from "../../dtos/bindingPackage";
import { ProjectResultDTO } from "../../dtos/project";
import { HTTPError } from "../../errors/base";
import { BindingPackageError } from "../../errors/bindingPackageErrors";
import bindingPackageService from "../../services/bindingPackageService";

interface IBindingPackageCode {
    binding_package_code: string;
    binding_package?: null | BindingPackageResultDTO;
    project_code: string;
    project?: null | ProjectResultDTO;
}

export class BindingPackageInitializer<DTO extends IBindingPackageCode> extends Initializer<IBindingPackage, DTO> {
    protected async getData(
        { binding_package, project_code }: DTO,
        updatedBy: string,
        s: ClientSession
    ): Promise<IBindingPackage | null> {
        const bindingPackage = await bindingPackageRepository.findById(binding_package!.id);
        if (bindingPackage!.project.code !== project_code) {
            throw new HTTPError(BindingPackageError.PROJECT_IS_SET);
        }
        await bindingPackageRepository.addContributor([binding_package!.id], updatedBy);
        return bindingPackage;
    }

    protected getKey(dto: DTO): string {
        return dto.binding_package_code;
    }

    protected insert(dto: DTO, updatedBy: string, s: ClientSession): Promise<IBindingPackage> {
        const { binding_package_code, project_code, project } = dto;
        return bindingPackageService.create(
            {
                code: binding_package_code,
                project: { code: project_code, need_review: project!.need_review, _id: new ObjectId(project!.id) },
            },
            updatedBy,
            s
        );
    }

    protected shouldInsert({ binding_package }: DTO): boolean {
        return !binding_package?.id;
    }
}

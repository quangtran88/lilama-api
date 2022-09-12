import { BaseService } from "./baseService";
import { IBindingPackage } from "../types/models/IBindingPackage";
import bindingPackageRepository from "../repositories/bindingPackageRepository";
import { BindingPackageError } from "../errors/bindingPackageErrors";
import { UploadBindingPackageDTO, UploadBindingPackageResultDTO } from "../types/dtos/bindingPackage";
import projectRepository from "../repositories/projectRepository";

class BindingPackageService extends BaseService<IBindingPackage> {
    constructor() {
        super(bindingPackageRepository, { NOT_FOUND: BindingPackageError.NOT_FOUND });
    }

    async verifyUpload(dtoList: UploadBindingPackageDTO[]): Promise<UploadBindingPackageResultDTO[]> {
        const result: UploadBindingPackageResultDTO[] = [];
        for (const data of dtoList) {
            const existed = await bindingPackageRepository.findByCode(data.code);
            if (existed) continue;

            const existedProject = await projectRepository.findByCode(data.projectCode);
            result.push({ ...data, existedProject: !!existedProject });
        }
        return result;
    }
}

export default new BindingPackageService();

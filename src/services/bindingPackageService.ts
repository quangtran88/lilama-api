import { BaseService } from "./baseService";
import { IBindingPackage } from "../types/models/IBindingPackage";
import bindingPackageRepository from "../repositories/bindingPackageRepository";
import { BindingPackageError } from "../errors/bindingPackageErrors";
import {
    UpdateBindingPackageDTO,
    UploadBindingPackageDTO,
    UploadBindingPackageResultDTO,
} from "../types/dtos/bindingPackage";
import projectRepository from "../repositories/projectRepository";
import { IProject } from "../types/models/IProject";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { IUploadService } from "../types/interfaces/service";
import { ProjectResultDTO } from "../dtos/project";
import { initCache } from "../utils/cache";
import { UploadError } from "../errors/base";
import { AnyKeys } from "mongoose";
import { ProjectInitializer } from "../utils/initializer/ProjectInitializer";
import mainContractRepository from "../repositories/mainContractRepository";

class BindingPackageService
    extends BaseService<IBindingPackage, any, UpdateBindingPackageDTO>
    implements IUploadService<UploadBindingPackageDTO, IBindingPackage, UploadBindingPackageResultDTO>
{
    dependencyRepo = [mainContractRepository];

    constructor() {
        super(bindingPackageRepository, { NOT_FOUND: BindingPackageError.NOT_FOUND });
    }

    _mapSearchToQuery(search: any): _FilterQuery<IBindingPackage> {
        return {};
    }

    async _beforeCreate(dto: any, createdBy: string): Promise<Partial<IBindingPackage>> {
        return { ...dto, need_review: true };
    }

    async _beforeUpdate(dto: UpdateBindingPackageDTO): Promise<AnyKeys<IBindingPackage>> {
        return { ...dto, need_review: false };
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IBindingPackage,
        dto: UpdateBindingPackageDTO,
        updatedBy: string
    ) {
        if (existed.need_review) {
            await dependencyRepo.updateMany(
                { "binding_package.code": existed.code },
                { "binding_package.need_review": false },
                updatedBy
            );
        }
    }

    async verifyUpload(dtoList: UploadBindingPackageDTO[]): Promise<UploadBindingPackageResultDTO[]> {
        const getProjectCache = initCache<IProject>((code) => projectRepository.findByCode(code));
        const existedCode: Set<string> = new Set();
        return verifyUpload<UploadBindingPackageDTO, UploadBindingPackageResultDTO>(
            dtoList,
            async (dto, lineNumber) => {
                const existed = await bindingPackageRepository.findByCode(dto.code);
                if (existed) return;

                if (existedCode.has(dto.code)) {
                    throw new UploadError("Duplicated code", lineNumber);
                }
                existedCode.add(dto.code);

                let project = await getProjectCache(dto.project_code);
                return { ...dto, project: project && new ProjectResultDTO(project) };
            }
        );
    }

    async commitUpload(dtoList: UploadBindingPackageResultDTO[], uploadedBy) {
        const data = await this.verifyUpload(dtoList);
        const projectInitializer = new ProjectInitializer();

        return commitUpload(data, bindingPackageRepository, uploadedBy, async (dto, s) => {
            let project = await projectInitializer.init(dto, uploadedBy, s);

            return bindingPackageRepository.insert(
                {
                    ...dto,
                    project: {
                        _id: project._id,
                        code: dto.project_code,
                        need_review: project.need_review,
                    },
                    need_review: true,
                },
                uploadedBy,
                s
            );
        });
    }

    async updateProjectReview(projectCode: string, updatedBy: string) {
        return bindingPackageRepository.updateMany({ "project.code": projectCode }, { need_review: false }, updatedBy);
    }
}

export default new BindingPackageService();

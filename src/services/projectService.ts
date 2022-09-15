import { CreateProjectDTO, UpdateProjectDTO, UploadProjectDTO } from "../types/dtos/project";
import projectRepository from "../repositories/projectRepository";
import { HTTPError, UploadError } from "../errors/base";
import { ProjectError } from "../errors/projectErrors";
import { BaseService } from "./baseService";
import { IProject } from "../types/models/IProject";
import { AnyKeys } from "mongoose";
import { IUploadService } from "../types/interfaces/service";
import { commitUpload, verifyUpload } from "../utils/upload";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import bindingPackageService from "./bindingPackageService";
import mainContractService from "./mainContractService";
import bindingPackageRepository from "../repositories/bindingPackageRepository";
import mainContractRepository from "../repositories/mainContractRepository";

class ProjectService
    extends BaseService<IProject, any, UpdateProjectDTO, CreateProjectDTO>
    implements IUploadService<UploadProjectDTO, IProject>
{
    dependencyRepo = [bindingPackageRepository, mainContractRepository];
    dependencyField = "project";

    constructor() {
        super(projectRepository, { NOT_FOUND: ProjectError.NOT_FOUND });
    }

    _mapSearchToQuery(search: any): _FilterQuery<IProject> {
        return {};
    }

    async _beforeUpdate(dto: UpdateProjectDTO, updatedBy: string, existed: IProject): Promise<AnyKeys<IProject>> {
        if (existed.need_review) {
            await bindingPackageService.updateProjectReview(existed.code, updatedBy);
            await mainContractService.updateProjectReview(existed.code, updatedBy);
        }
        return { ...dto, need_review: false };
    }

    async _beforeCreate(dto: any, createdBy: string): Promise<Partial<IProject>> {
        const existed = await projectRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ProjectError.CODE_EXISTED);
        }
        return { ...dto, need_review: true };
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IProject,
        dto: UpdateProjectDTO,
        updatedBy: string
    ) {
        if (existed.need_review) {
            await dependencyRepo.updateMany(
                { "project.code": existed.code },
                { "project.need_review": false },
                updatedBy
            );
        }
    }

    async verifyUpload(data: UploadProjectDTO[]) {
        const existedCode: Set<string> = new Set();
        return verifyUpload(data, async (dto, line) => {
            const existed = await projectRepository.findByCode(dto.code);
            if (existed) return;

            if (existedCode.has(dto.code)) {
                throw new UploadError("Duplicated code", line);
            }
            existedCode.add(dto.code);
            return dto;
        });
    }

    async commitUpload(dtoList: UploadProjectDTO[], uploadedBy: string) {
        const data = await this.verifyUpload(dtoList);
        return commitUpload(data, projectRepository, uploadedBy, async (dto, s) => {
            return this.create(dto, uploadedBy, s);
        });
    }
}

export default new ProjectService();

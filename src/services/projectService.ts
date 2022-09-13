import { CreateProjectDTO, UpdateProjectDTO, UploadProjectDTO } from "../types/dtos/project";
import projectRepository from "../repositories/projectRepository";
import { HTTPError } from "../errors/base";
import { ProjectError } from "../errors/projectErrors";
import { BaseService } from "./baseService";
import { IProject } from "../types/models/IProject";
import { AnyKeys } from "mongoose";
import { IUploadService } from "../types/interfaces/service";
import { commitUpload, verifyUpload } from "../utils/upload";
import { _FilterQuery } from "../repositories/baseRepository";
import bindingPackageService from "./bindingPackageService";

class ProjectService
    extends BaseService<IProject, any, UpdateProjectDTO, CreateProjectDTO>
    implements IUploadService<UploadProjectDTO, IProject>
{
    constructor() {
        super(projectRepository, { NOT_FOUND: ProjectError.NOT_FOUND });
    }

    _mapSearchToQuery(search: any): _FilterQuery<IProject> {
        return {};
    }

    async _beforeUpdate(dto: UpdateProjectDTO, updatedBy: string, existed: IProject): Promise<AnyKeys<IProject>> {
        if (existed.need_review) {
            await bindingPackageService.updateProjectReview(existed.code, updatedBy);
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

    async verifyUpload(data: UploadProjectDTO[]) {
        return verifyUpload(data, async (dto) => {
            const existed = await projectRepository.findByCode(dto.code);
            if (existed) return;
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

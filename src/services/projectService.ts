import { CreateProjectDTO, UpdateProjectDTO, UploadProjectDTO } from "../types/dtos/project";
import projectRepository from "../repositories/projectRepository";
import { HTTPError } from "../errors/base";
import { ProjectError } from "../errors/projectErrors";
import { BaseService } from "./baseService";
import { IProject } from "../types/models/IProject";
import { ClientSession } from "mongoose";
import { IUpdateService, IUploadService } from "../types/interfaces/service";
import { commitUpload, verifyUpload } from "../utils/upload";
import { _FilterQuery } from "../repositories/baseRepository";

class ProjectService
    extends BaseService<IProject>
    implements IUploadService<UploadProjectDTO, IProject>, IUpdateService<UpdateProjectDTO>
{
    constructor() {
        super(projectRepository, { NOT_FOUND: ProjectError.NOT_FOUND });
    }

    async create(dto: CreateProjectDTO, createdBy: string, session?: ClientSession) {
        const existed = await projectRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ProjectError.CODE_EXISTED);
        }
        return projectRepository.insert(dto, createdBy, session);
    }

    async update(dto: UpdateProjectDTO, updatedBy: string) {
        await this.assertExisted(dto.id);
        return projectRepository.updateById(dto.id, { ...dto, need_review: false }, updatedBy);
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

    mapSearchToQuery(search: any): _FilterQuery<IProject> {
        return {};
    }
}

export default new ProjectService();

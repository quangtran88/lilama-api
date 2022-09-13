import { CreateProjectDTO, UpdateProjectDTO, UploadProjectDTO } from "../types/dtos/project";
import projectRepository from "../repositories/projectRepository";
import { HTTPError } from "../errors/base";
import { ProjectError } from "../errors/projectErrors";
import { BaseService } from "./baseService";
import { IProject } from "../types/models/IProject";
import { IUser, ReadAllPermissions, UserPermission } from "../types/models/IUser";
import { ClientSession, PaginateResult } from "mongoose";
import { ProjectResultDTO } from "../dtos/project";
import {
    IDisableService,
    IGetDetailsService,
    IPaginateService,
    IUpdateService,
    IUploadService,
} from "../types/interfaces/service";
import { commitUpload, verifyUpload } from "../utils/upload";

class ProjectService
    extends BaseService<IProject>
    implements
        IUploadService<UploadProjectDTO, IProject>,
        IPaginateService<IProject>,
        IGetDetailsService<ProjectResultDTO>,
        IUpdateService<UpdateProjectDTO>,
        IDisableService
{
    constructor() {
        super(projectRepository, { NOT_FOUND: ProjectError.NOT_FOUND });
    }

    async create(dto: CreateProjectDTO, createdBy: string, session?: ClientSession) {
        const existed = await projectRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ProjectError.CODE_EXISTED);
        }
        return projectRepository.insert({ ...dto, need_review: true }, createdBy, session);
    }

    async update(dto: UpdateProjectDTO, updatedBy: string) {
        await this.assertExisted(dto.id);
        return projectRepository.updateById(dto.id, { ...dto, need_review: false }, updatedBy);
    }

    async getAll(currentUser: IUser) {
        if (ReadAllPermissions.includes(currentUser.permission)) {
            return projectRepository.find();
        }
        if (currentUser.permission == UserPermission.C) {
            return projectRepository.findContributed(currentUser.username);
        }
        return [];
    }

    async getPage(currentUser: IUser, _?: any, page = 1, limit = 20): Promise<PaginateResult<IProject>> {
        if (ReadAllPermissions.includes(currentUser.permission)) {
            return projectRepository.findPage({}, page, limit);
        }
        return projectRepository.findContributedPage(currentUser.username, {}, page, limit);
    }

    async getDetails(id: string, currentUser: IUser) {
        let project: IProject | null;
        if (ReadAllPermissions.includes(currentUser.permission)) {
            project = await projectRepository.findById(id);
        } else {
            project = await projectRepository.findByIdContributed(currentUser.username, id);
        }
        return project && new ProjectResultDTO(project);
    }

    async verifyUpload(data: UploadProjectDTO[]) {
        return verifyUpload(data, async (dto) => {
            const existed = await projectRepository.findByCode(dto.code);
            return !existed;
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

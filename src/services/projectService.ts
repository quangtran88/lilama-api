import { CreateProjectDTO, UpdateProjectDTO } from "../types/dtos/project";
import projectRepository from "../repositories/projectRepository";
import { HTTPError } from "../errors/base";
import { ProjectError } from "../errors/projectErrors";
import { BaseService } from "./baseService";
import { IProject } from "../types/models/IProject";
import { IUser, ReadAllPermissions, UserPermission } from "../types/models/IUser";

class ProjectService extends BaseService<IProject> {
    constructor() {
        super(projectRepository, { NOT_FOUND: ProjectError.NOT_FOUND });
    }

    async create(dto: CreateProjectDTO, createdBy: string) {
        const existed = await projectRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ProjectError.CODE_EXISTED);
        }

        return projectRepository.create({ ...dto, created_by: createdBy, contributors: [createdBy] });
    }

    async update(dto: UpdateProjectDTO, updatedBy: string) {
        const project = await this.assertExisted(dto.id);

        const contributors = new Set(project.contributors);
        contributors.add(updatedBy);

        return projectRepository.updateById(dto.id, {
            ...dto,
            updated_by: updatedBy,
            contributors: Array.from(contributors),
        });
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
}

export default new ProjectService();

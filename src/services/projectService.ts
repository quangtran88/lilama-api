import { CreateProjectDTO, UpdateProjectDTO, UploadProjectDTO } from "../types/dtos/project";
import projectRepository from "../repositories/projectRepository";
import { HTTPError } from "../errors/base";
import { ProjectError } from "../errors/projectErrors";
import { BaseService } from "./baseService";
import { IProject } from "../types/models/IProject";
import { IUser, ReadAllPermissions, UserPermission } from "../types/models/IUser";
import mongoose, { ClientSession, PaginateResult } from "mongoose";

class ProjectService extends BaseService<IProject> {
    constructor() {
        super(projectRepository, { NOT_FOUND: ProjectError.NOT_FOUND });
    }

    async create(dto: CreateProjectDTO, createdBy: string, session?: ClientSession) {
        const existed = await projectRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ProjectError.CODE_EXISTED);
        }

        return projectRepository.insert(
            {
                ...dto,
                created_by: createdBy,
                contributors: [createdBy],
                need_review: true,
            },
            session
        );
    }

    async update(dto: UpdateProjectDTO, updatedBy: string) {
        const project = await this.assertExisted(dto.id);

        const contributors = new Set(project.contributors);
        contributors.add(updatedBy);

        return projectRepository.updateById(dto.id, {
            ...dto,
            updated_by: updatedBy,
            contributors: Array.from(contributors),
            need_review: false,
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

    async getPage(currentUser: IUser, page = 1, limit = 20): Promise<PaginateResult<IProject>> {
        if (ReadAllPermissions.includes(currentUser.permission)) {
            return projectRepository.findPage({}, page, limit);
        }
        return projectRepository.findContributedPage(currentUser.username, {}, page, limit);
    }

    async verifyUpload(data: UploadProjectDTO[]) {
        const uploadData: UploadProjectDTO[] = [];
        for (const project of data) {
            const existed = await projectRepository.findByCode(project.code);
            if (existed) continue;
            uploadData.push(project);
        }
        return uploadData;
    }

    async commitUpload(data: UploadProjectDTO[], uploadedBy: string) {
        await this.verifyUpload(data);
        let result: IProject[] = [];
        const session = await mongoose.startSession();
        await session.withTransaction(async (s) => {
            const created = await projectRepository.insertMany(
                data.map((d) => ({ ...d, created_by: uploadedBy, contributors: [uploadedBy], need_review: true })),
                s
            );
            await projectRepository.insertUpload(
                data,
                uploadedBy,
                created.map((c) => c._id),
                s
            );
            result = created;
        });
        return result;
    }
}

export default new ProjectService();

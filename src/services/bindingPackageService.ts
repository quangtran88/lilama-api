import { BaseService } from "./baseService";
import { IBindingPackage } from "../types/models/IBindingPackage";
import bindingPackageRepository from "../repositories/bindingPackageRepository";
import { BindingPackageError } from "../errors/bindingPackageErrors";
import { UploadBindingPackageDTO, UploadBindingPackageResultDTO } from "../types/dtos/bindingPackage";
import projectRepository from "../repositories/projectRepository";
import mongoose from "mongoose";
import { IProject } from "../types/models/IProject";
import { IUser, ReadAllPermissions } from "../types/models/IUser";

class BindingPackageService extends BaseService<IBindingPackage> {
    constructor() {
        super(bindingPackageRepository, { NOT_FOUND: BindingPackageError.NOT_FOUND });
    }

    async verifyUpload(dtoList: UploadBindingPackageDTO[]): Promise<UploadBindingPackageResultDTO[]> {
        const result: UploadBindingPackageResultDTO[] = [];

        for (const data of dtoList) {
            const existed = await bindingPackageRepository.findByCode(data.code);

            if (existed) continue;

            const existedProject = await projectRepository.findByCode(data.project_code);
            result.push({
                ...data,
                project: existedProject,
            });
        }
        return result;
    }

    async commitUpload(dtoList: UploadBindingPackageDTO[], uploadedBy) {
        const data = await this.verifyUpload(dtoList);
        const projectsToInsert: Partial<IProject>[] = data
            .filter((d) => !d.project?._id)
            .map((d) => ({
                code: d.project_code,
                need_review: true,
            }));
        const bindingPackagesToInsert: Partial<IBindingPackage>[] = data.map((d) => ({
            ...d,
            project: {
                code: d.project_code,
                need_review: !d.project || d.project.need_review,
            },
            need_review: true,
        }));
        const projectIdsToContribute = data.filter((d) => d.project?._id).map((d) => d.project!._id);
        let result: IBindingPackage[] = [];

        const session = await mongoose.startSession();
        await session.withTransaction(async (s) => {
            await projectRepository.insertMany(projectsToInsert, uploadedBy, s);
            await projectRepository.addContributor(projectIdsToContribute, uploadedBy);

            const created = await bindingPackageRepository.insertMany(bindingPackagesToInsert, uploadedBy, s);

            const createdIds = created.map((c) => c._id);
            await bindingPackageRepository.insertUpload(data, uploadedBy, createdIds, s);
            result = created;
        });
        return result;
    }

    async getPage(currentUser: IUser, page: number, limit: number) {
        if (ReadAllPermissions.includes(currentUser.permission)) {
            return bindingPackageRepository.findPage({}, page, limit);
        }
        return bindingPackageRepository.findContributedPage(currentUser.username, {}, page, limit);
    }
}

export default new BindingPackageService();

import { IProject, IProjectModel, IProjectUpload, IProjectUploadModel } from "../types/models/IProject";
import { ProjectModel, ProjectUploadModel } from "../models/projectModel";
import { BaseRepository } from "./baseRepository";
import { ClientSession } from "mongoose";

class ProjectRepository extends BaseRepository<IProject, IProjectModel, IProjectUpload, IProjectUploadModel> {
    constructor() {
        super(ProjectModel, ProjectUploadModel);
    }

    async findByCode(code: IProject["code"]) {
        return this.findFirst({ code });
    }

    async insert(data: Partial<IProject>, createdBy: string, session?: ClientSession): Promise<IProject> {
        return super.insert({ ...data, need_review: true }, createdBy, session);
    }
}

export default new ProjectRepository();

import { IProject, IProjectModel, IProjectUpload, IProjectUploadModel } from "../types/models/IProject";
import { ProjectModel, ProjectUploadModel } from "../models/projectModel";
import { BaseRepository } from "./baseRepository";

class ProjectRepository extends BaseRepository<IProject, IProjectModel, IProjectUpload, IProjectUploadModel> {
    constructor() {
        super(ProjectModel, ProjectUploadModel);
    }

    async findByCode(code: IProject["code"]) {
        return this.findFirst({ code });
    }
}

export default new ProjectRepository();

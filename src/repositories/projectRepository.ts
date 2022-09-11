import { IProject, IProjectModel, IProjectUploadModel } from "../types/models/IProject";
import { ProjectModel, ProjectUploadModel } from "../models/projectModel";
import { BaseRepository } from "./baseRepository";

class ProjectRepository extends BaseRepository<IProject, IProjectModel, IProjectUploadModel> {
    constructor() {
        super(ProjectModel, ProjectUploadModel);
    }

    async findByCode(code: IProject["code"]) {
        return this.findFirst({ code });
    }
}

export default new ProjectRepository();

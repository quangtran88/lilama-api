import { IProject, IProjectModel } from "../types/models/IProject";
import { ProjectModel } from "../models/projectModel";
import { BaseRepository } from "./baseRepository";

class ProjectRepository extends BaseRepository<IProject, IProjectModel> {
    constructor() {
        super(ProjectModel);
    }

    async findByCode(code: IProject["code"]) {
        return this.findFirst({ code });
    }
}

export default new ProjectRepository();

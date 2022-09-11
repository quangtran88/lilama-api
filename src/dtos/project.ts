import { BaseResultDTO } from "./base";
import { IProject } from "../types/models/IProject";

export class ProjectResultDTO extends BaseResultDTO {
    code: string;
    description?: string;
    need_review?: boolean;

    constructor(project: IProject) {
        super(project);
        this.code = project.code;
        this.description = project.description;
        this.need_review = project.need_review;
    }
}

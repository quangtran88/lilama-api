import { Initializer } from "./Initializer";
import { IProject } from "../../types/models/IProject";
import projectRepository from "../../repositories/projectRepository";
import { ClientSession } from "mongoose";
import projectService from "../../services/projectService";

interface IProjectCode {
    project_code: string;
    project?: null | {
        id: string;
    };
}

export class ProjectInitializer<DTO extends IProjectCode> extends Initializer<IProject, DTO> {
    protected async getData(dto: DTO, uploadedBy: string, s: ClientSession): Promise<IProject | null> {
        await projectRepository.addContributor([dto.project!.id], uploadedBy, s);
        return projectRepository.findById(dto.project!.id);
    }

    protected getKey(dto: DTO): string {
        return dto.project_code;
    }

    protected insert(dto: DTO, updatedBy: string, s: ClientSession): Promise<IProject> {
        return projectService.create({ code: dto.project_code }, updatedBy, s);
    }

    protected shouldInsert(dto: DTO): boolean {
        return !dto.project?.id;
    }
}

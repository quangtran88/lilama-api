import { Initializer } from "./Initializer";
import { IProject } from "../../types/models/IProject";
import { UploadBindingPackageResultDTO } from "../../types/dtos/bindingPackage";
import projectRepository from "../../repositories/projectRepository";
import { ClientSession } from "mongoose";
import projectService from "../../services/projectService";

export class BPProjectInitializer extends Initializer<IProject, UploadBindingPackageResultDTO> {
    async getData(dto: UploadBindingPackageResultDTO, uploadedBy: string, s: ClientSession): Promise<IProject | null> {
        await projectRepository.addContributor([dto.project!.id], uploadedBy, s);
        return projectRepository.findById(dto.project!.id);
    }

    getKey(dto: UploadBindingPackageResultDTO): string {
        return dto.project_code;
    }

    insert(dto: UploadBindingPackageResultDTO, updatedBy: string, s: ClientSession): Promise<IProject> {
        return projectService.create({ code: dto.project_code }, updatedBy, s);
    }

    shouldInsert(dto: UploadBindingPackageResultDTO): boolean {
        return !dto.project?.id;
    }
}

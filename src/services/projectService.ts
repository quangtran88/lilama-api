import { CreateProjectDTO } from "../types/dtos/project";
import projectRepository from "../repositories/projectRepository";
import { HTTPError } from "../errors/base";
import { ProjectError } from "../errors/projectErrors";

class ProjectService {
    async createProject(dto: CreateProjectDTO) {
        const existed = await projectRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ProjectError.CODE_EXISTED);
        }

        return projectRepository.create(dto);
    }
}

export default new ProjectService();
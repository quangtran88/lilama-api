import { BaseService } from "./baseService";
import { IBindingPackage } from "../types/models/IBindingPackage";
import bindingPackageRepository from "../repositories/bindingPackageRepository";
import { BindingPackageError } from "../errors/bindingPackageErrors";
import { UploadBindingPackageDTO, UploadBindingPackageResultDTO } from "../types/dtos/bindingPackage";
import projectRepository from "../repositories/projectRepository";
import { IProject } from "../types/models/IProject";
import { _FilterQuery } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { IUploadService } from "../types/interfaces/service";
import projectService from "./projectService";
import { ProjectResultDTO } from "../dtos/project";
import { initCache } from "../utils/cache";

class BindingPackageService
    extends BaseService<IBindingPackage>
    implements IUploadService<UploadBindingPackageDTO, IBindingPackage, UploadBindingPackageResultDTO>
{
    constructor() {
        super(bindingPackageRepository, { NOT_FOUND: BindingPackageError.NOT_FOUND });
    }

    async verifyUpload(dtoList: UploadBindingPackageDTO[]): Promise<UploadBindingPackageResultDTO[]> {
        const getProjectCache = initCache<IProject>((code) => projectRepository.findByCode(code));
        return verifyUpload<UploadBindingPackageDTO, UploadBindingPackageResultDTO>(dtoList, async (dto) => {
            const existed = await bindingPackageRepository.findByCode(dto.code);
            if (existed) return;

            let project = await getProjectCache(dto.project_code);
            return { ...dto, project: project && new ProjectResultDTO(project) };
        });
    }

    async commitUpload(dtoList: UploadBindingPackageDTO[], uploadedBy) {
        const data = await this.verifyUpload(dtoList);
        const getProjectCache = initCache<IProject>((id) => projectRepository.findById(id));
        return commitUpload(data, bindingPackageRepository, uploadedBy, async (dto, s) => {
            let project;
            if (dto.project?.id) {
                const projectId = dto.project.id;
                project = await getProjectCache(projectId.toString());
                await projectRepository.addContributor([projectId], uploadedBy, s);
            } else {
                await projectService.create({ code: dto.project_code }, uploadedBy, s);
            }
            return bindingPackageRepository.insert(
                {
                    ...dto,
                    project: {
                        code: dto.project_code,
                        need_review: !project || project.need_review,
                    },
                },
                uploadedBy,
                s
            );
        });
    }

    mapSearchToQuery(search: any): _FilterQuery<IBindingPackage> {
        return {};
    }
}

export default new BindingPackageService();

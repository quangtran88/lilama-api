import { BaseService } from "./baseService";
import { IMainContract } from "../types/models/IMainContract";
import { UpdateMainContractDTO, UploadMainContractDTO, UploadMainContractResultDTO } from "../types/dtos/mainContract";
import { IUploadService } from "../types/interfaces/service";
import { AnyKeys } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { HTTPError, UploadError } from "../errors/base";
import mainContractRepository from "../repositories/mainContractRepository";
import { initCache } from "../utils/cache";
import { IProject } from "../types/models/IProject";
import projectRepository from "../repositories/projectRepository";
import customerRepository from "../repositories/customerRepository";
import { ICustomer } from "../types/models/ICustomer";
import { IBindingPackage } from "../types/models/IBindingPackage";
import bindingPackageRepository from "../repositories/bindingPackageRepository";
import { ProjectResultDTO } from "../dtos/project";
import { CustomerResultDTO } from "../dtos/customer";
import { BindingPackageResultDTO } from "../dtos/bindingPackage";
import { ProjectInitializer } from "../utils/initializer/ProjectInitializer";
import { CustomerInitializer } from "../utils/initializer/CustomerInitializer";
import { BindingPackageInitializer } from "../utils/initializer/BindingPackageInitializer";
import { MainContractError } from "../errors/mainContractErrors";
import projectService from "./projectService";
import bindingPackageService from "./bindingPackageService";
import { BindingPackageError } from "../errors/bindingPackageErrors";
import customerService from "./customerService";
import IncomeRepository from "../repositories/incomeRepository";

class MainContractService
    extends BaseService<IMainContract, any, UpdateMainContractDTO>
    implements IUploadService<UploadMainContractDTO, IMainContract, UploadMainContractResultDTO>
{
    dependencyField = "main_contract";
    dependencyRepo = [IncomeRepository];

    constructor() {
        super(mainContractRepository, { NOT_FOUND: MainContractError.NOT_FOUND });
    }
    async _beforeCreate(dto: any, createdBy: string): Promise<Partial<IMainContract>> {
        return { ...dto, need_review: true };
    }

    async _beforeUpdate(
        dto: UpdateMainContractDTO,
        updatedBy: string,
        existed: IMainContract
    ): Promise<AnyKeys<IMainContract>> {
        const projectCode = dto.project_code || existed.project.code;
        const bindingPackageCode = dto.binding_package_code || existed.binding_package.code;
        const customerCode = dto.customer_code || existed.customer.code;

        let project = await projectRepository.findByCode(projectCode);
        if (!project) {
            project = await projectService.create({ code: projectCode }, updatedBy);
        }

        let binding_package = await bindingPackageRepository.findByCode(bindingPackageCode);
        if (!binding_package) {
            binding_package = await bindingPackageService.create({ code: bindingPackageCode, project }, updatedBy);
        } else if (binding_package.project.code != projectCode) {
            throw new HTTPError(BindingPackageError.PROJECT_IS_SET);
        }

        let customer = await customerRepository.findByCode(customerCode);
        if (!customer) {
            customer = await customerService.create({ code: customerCode }, updatedBy);
        }
        return { ...dto, project, binding_package, customer, need_review: false };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IMainContract> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IMainContract,
        dto: UpdateMainContractDTO,
        updatedBy: string
    ) {
        if (existed.need_review) {
            await dependencyRepo.updateMany(
                { "main_contract.code": existed.code },
                { "main_contract.need_review": false },
                updatedBy
            );
        }
    }

    verifyUpload(dtoList: UploadMainContractDTO[]): Promise<UploadMainContractResultDTO[]> {
        const existedCode = new Set<string>();
        const getProjectCache = initCache<IProject>((code) => projectRepository.findByCode(code));
        const getCustomerCache = initCache<ICustomer>((code) => customerRepository.findByCode(code));
        const getBindingPackageCache = initCache<IBindingPackage>((code) => bindingPackageRepository.findByCode(code));

        return verifyUpload<UploadMainContractDTO, UploadMainContractResultDTO>(dtoList, async (dto, line) => {
            if (existedCode.has(dto.code)) {
                throw new UploadError("Duplicated code", line);
            }
            existedCode.add(dto.code);

            const existed = await mainContractRepository.findByCode(dto.code);
            if (existed) {
                return;
            }

            const project = await getProjectCache(dto.project_code);
            const customer = await getCustomerCache(dto.customer_code);
            const binding_package = await getBindingPackageCache(dto.binding_package_code);

            return {
                ...dto,
                project: project && new ProjectResultDTO(project),
                customer: customer && new CustomerResultDTO(customer),
                binding_package: binding_package && new BindingPackageResultDTO(binding_package),
            };
        });
    }

    async commitUpload(dtoList: UploadMainContractResultDTO[], uploadedBy: string): Promise<IMainContract[]> {
        const data = await this.verifyUpload(dtoList);
        const projectInitializer = new ProjectInitializer();
        const customerInitializer = new CustomerInitializer();
        const bindingPackageInitializer = new BindingPackageInitializer();

        return commitUpload(data, mainContractRepository, uploadedBy, async (dto, s) => {
            const project = await projectInitializer.init(dto, uploadedBy, s);
            const customer = await customerInitializer.init(dto, uploadedBy, s);
            dto.project = new ProjectResultDTO(project);
            const binding_package = await bindingPackageInitializer.init(dto, uploadedBy, s);

            return this.create({ ...dto, project, binding_package, customer }, uploadedBy, s);
        });
    }

    async updateProjectReview(projectCode: string, updatedBy: string) {
        return mainContractRepository.updateMany({ "project.code": projectCode }, { need_review: false }, updatedBy);
    }
}

export default new MainContractService();

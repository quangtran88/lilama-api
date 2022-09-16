import { BaseService } from "./baseService";
import { IFreelanceContract } from "../types/models/IFreelanceContract";
import {
    UpdateFreelanceContractDTO,
    UploadFreelanceContractDTO,
    UploadFreelanceContractResultDTO,
} from "../types/dtos/freelanceContract";
import { IUploadService } from "../types/interfaces/service";
import { AnyKeys } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { UploadError } from "../errors/base";
import freelanceContractRepository from "../repositories/freelanceContractRepository";
import { initCache } from "../utils/cache";
import { IManager } from "../types/models/IManager";
import managerRepository from "../repositories/managerRepository";
import executorRepository from "../repositories/executorRepository";
import { IExecutor } from "../types/models/IExecutor";
import { IMainContract } from "../types/models/IMainContract";
import mainContractRepository from "../repositories/mainContractRepository";
import { ManagerResultDTO } from "../dtos/manager";
import { ExecutorResultDTO } from "../dtos/executor";
import { MainContractResultDTO } from "../dtos/mainContract";
import { ManagerInitializer } from "../utils/initializer/ManagerInitializer";
import { ExecutorInitializer } from "../utils/initializer/ExecutorInitializer";
import { MainContractInitializer } from "../utils/initializer/MainContractInitializer";
import { FreelanceContractError } from "../errors/freelanceContractErrors";
import managerService from "./managerService";
import mainContractService from "./mainContractService";
import executorService from "./executorService";
import { TEMP_CODE } from "../config/common";
import acceptanceRepository from "../repositories/acceptanceRepository";

class FreelanceContractService
    extends BaseService<IFreelanceContract, any, UpdateFreelanceContractDTO>
    implements IUploadService<UploadFreelanceContractDTO, IFreelanceContract, UploadFreelanceContractResultDTO>
{
    dependencyField = "freelance_contract";
    dependencyRepo = [acceptanceRepository];
    tempQuery = { code: TEMP_CODE };
    tempData = { code: TEMP_CODE };

    constructor() {
        super(freelanceContractRepository, { NOT_FOUND: FreelanceContractError.NOT_FOUND });
    }
    async _beforeCreate(dto: any, createdBy: string): Promise<Partial<IFreelanceContract>> {
        return { ...dto, need_review: true };
    }

    async _beforeUpdate(
        dto: UpdateFreelanceContractDTO,
        updatedBy: string,
        existed: IFreelanceContract
    ): Promise<AnyKeys<IFreelanceContract>> {
        const managerCode = dto.manager_code || existed.manager.code;
        const mainContractCode = dto.main_contract_code || existed.main_contract.code;
        const executorCode = dto.executor_code || existed.executor.code;

        let manager = await managerRepository.findByCode(managerCode);
        if (!manager) {
            manager = await managerService.create({ code: managerCode }, updatedBy);
        }

        let main_contract = await mainContractRepository.findByCode(mainContractCode);
        if (!main_contract) {
            main_contract = await mainContractService.create({ code: mainContractCode }, updatedBy);
        }

        let executor = await executorRepository.findByCode(executorCode);
        if (!executor) {
            executor = await executorService.create({ code: executorCode }, updatedBy);
        }
        return { ...dto, manager, main_contract, executor, need_review: false };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IFreelanceContract> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IFreelanceContract,
        dto: UpdateFreelanceContractDTO,
        updatedBy: string
    ) {
        if (existed.need_review) {
            await dependencyRepo.updateMany(
                { "freelance_contract.code": existed.code },
                { "freelance_contract.need_review": false },
                updatedBy
            );
        }
    }

    verifyUpload(dtoList: UploadFreelanceContractDTO[]): Promise<UploadFreelanceContractResultDTO[]> {
        const existedCode = new Set<string>();
        const getManagerCache = initCache<IManager>((code) => managerRepository.findByCode(code));
        const getExecutorCache = initCache<IExecutor>((code) => executorRepository.findByCode(code));
        const getMainContractCache = initCache<IMainContract>((code) => mainContractRepository.findByCode(code));

        return verifyUpload<UploadFreelanceContractDTO, UploadFreelanceContractResultDTO>(
            dtoList,
            async (dto, line) => {
                if (existedCode.has(dto.code)) {
                    throw new UploadError("Duplicated code", line);
                }
                existedCode.add(dto.code);

                const existed = await freelanceContractRepository.findByCode(dto.code);
                if (existed) {
                    return;
                }

                const manager = await getManagerCache(dto.manager_code);
                const executor = await getExecutorCache(dto.executor_code);
                const main_contract = await getMainContractCache(dto.main_contract_code);

                return {
                    ...dto,
                    manager: manager && new ManagerResultDTO(manager),
                    executor: executor && new ExecutorResultDTO(executor),
                    main_contract: main_contract && new MainContractResultDTO(main_contract),
                };
            }
        );
    }

    async commitUpload(dtoList: UploadFreelanceContractResultDTO[], uploadedBy: string): Promise<IFreelanceContract[]> {
        const data = await this.verifyUpload(dtoList);
        const managerInitializer = new ManagerInitializer();
        const executorInitializer = new ExecutorInitializer();
        const mainContractInitializer = new MainContractInitializer();

        return commitUpload(data, freelanceContractRepository, uploadedBy, async (dto, s) => {
            const manager = await managerInitializer.init(dto, uploadedBy, s);
            const executor = await executorInitializer.init(dto, uploadedBy, s);
            const main_contract = await mainContractInitializer.init(dto, uploadedBy, s);

            return this.create({ ...dto, manager, main_contract, executor }, uploadedBy, s);
        });
    }
}

export default new FreelanceContractService();

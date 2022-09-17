import { BaseService } from "./baseService";
import { IExecution } from "../types/models/IExecution";
import { UpdateExecutionDTO, UploadExecutionDTO, UploadExecutionResultDTO } from "../types/dtos/execution";
import { IUploadService } from "../types/interfaces/service";
import executionRepository from "../repositories/executionRepository";
import { ExecutionError } from "../errors/executionErrors";
import { AnyKeys, ClientSession } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { initCache } from "../utils/cache";
import { IFreelanceContract } from "../types/models/IFreelanceContract";
import freelanceContractRepository from "../repositories/freelanceContractRepository";
import { FreelanceContractResultDTO } from "../dtos/freelanceContract";
import { FreelanceContractInitializer } from "../utils/initializer/FreelanceContractInitializer";
import { UploadError } from "../errors/base";
import { ICostType } from "../types/models/ICostType";
import costTypeRepository from "../repositories/costTypeRepository";

class ExecutionService
    extends BaseService<IExecution, any, UpdateExecutionDTO>
    implements IUploadService<UploadExecutionDTO, IExecution, UploadExecutionResultDTO>
{
    constructor() {
        super(executionRepository, { NOT_FOUND: ExecutionError.NOT_FOUND });
    }

    async _beforeCreate(
        dto: Partial<IExecution>,
        createdBy: string,
        session: ClientSession | undefined
    ): Promise<Partial<IExecution>> {
        return { ...dto };
    }

    async _beforeUpdate(dto: UpdateExecutionDTO, updatedBy: string, existed: IExecution): Promise<AnyKeys<IExecution>> {
        return { ...dto };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IExecution> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IExecution,
        dto: UpdateExecutionDTO,
        updatedBy: string
    ): Promise<void> {
        return;
    }

    async verifyUpload(dtoList: UploadExecutionDTO[]): Promise<UploadExecutionResultDTO[]> {
        const getFreelanceContractCache = initCache<IFreelanceContract>((code) =>
            freelanceContractRepository.findByCode(code)
        );
        const getCostTypeCache = initCache<ICostType>((code) => costTypeRepository.findByCode(code));

        return verifyUpload(dtoList, async (dto, line) => {
            const freelanceContract = await getFreelanceContractCache(dto.freelance_contract_code);

            const costType = await getCostTypeCache(dto.cost_type_code);
            if (!costType) {
                throw new UploadError(`Cost Type ${dto.cost_type_code} not exist`, line);
            }

            return {
                ...dto,
                freelance_contract: freelanceContract && new FreelanceContractResultDTO(freelanceContract),
            };
        });
    }

    async commitUpload(dtoList: UploadExecutionResultDTO[], uploadedBy: string): Promise<IExecution[]> {
        const data = await this.verifyUpload(dtoList);
        const freelanceContractInitializer = new FreelanceContractInitializer();
        const getCostTypeCache = initCache<ICostType>((code) => costTypeRepository.findByCode(code));

        return commitUpload(data, executionRepository, uploadedBy, async (dto, s) => {
            const freelance_contract = await freelanceContractInitializer.init(dto, uploadedBy, s);
            const cost_type = await getCostTypeCache(dto.cost_type_code);
            return this.create({ ...dto, freelance_contract, cost_type: cost_type! }, uploadedBy, s);
        });
    }
}

export default new ExecutionService();

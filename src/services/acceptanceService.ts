import { BaseService } from "./baseService";
import { IAcceptance } from "../types/models/IAcceptance";
import { UpdateAcceptanceDTO, UploadAcceptanceDTO, UploadAcceptanceResultDTO } from "../types/dtos/acceptance";
import { IUploadService } from "../types/interfaces/service";
import acceptanceRepository from "../repositories/acceptanceRepository";
import { AcceptanceError } from "../errors/acceptanceErrors";
import { AnyKeys, ClientSession } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { initCache } from "../utils/cache";
import { IFreelanceContract } from "../types/models/IFreelanceContract";
import freelanceContractRepository from "../repositories/freelanceContractRepository";
import { FreelanceContractResultDTO } from "../dtos/freelanceContract";
import { FreelanceContractInitializer } from "../utils/initializer/FreelanceContractInitializer";

class AcceptanceService
    extends BaseService<IAcceptance, any, UpdateAcceptanceDTO>
    implements IUploadService<UploadAcceptanceDTO, IAcceptance, UploadAcceptanceResultDTO>
{
    constructor() {
        super(acceptanceRepository, { NOT_FOUND: AcceptanceError.NOT_FOUND });
    }

    async _beforeCreate(
        dto: Partial<IAcceptance>,
        createdBy: string,
        session: ClientSession | undefined
    ): Promise<Partial<IAcceptance>> {
        const remaining_value = this.calculateRemainingValue(dto.execution_value, dto.acceptance_value);
        return { ...dto, remaining_value };
    }

    async _beforeUpdate(
        dto: UpdateAcceptanceDTO,
        updatedBy: string,
        existed: IAcceptance
    ): Promise<AnyKeys<IAcceptance>> {
        const remaining_value = this.calculateRemainingValue(
            dto.execution_value || existed.execution_value,
            dto.acceptance_value || existed.acceptance_value
        );
        return { ...dto, remaining_value };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IAcceptance> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IAcceptance,
        dto: UpdateAcceptanceDTO,
        updatedBy: string
    ): Promise<void> {
        return;
    }

    async verifyUpload(dtoList: UploadAcceptanceDTO[]): Promise<UploadAcceptanceResultDTO[]> {
        const getFreelanceContractCache = initCache<IFreelanceContract>((code) =>
            freelanceContractRepository.findByCode(code)
        );
        return verifyUpload(dtoList, async (dto) => {
            const freelanceContract = await getFreelanceContractCache(dto.freelance_contract_code);
            return {
                ...dto,
                freelance_contract: freelanceContract && new FreelanceContractResultDTO(freelanceContract),
            };
        });
    }

    async commitUpload(dtoList: UploadAcceptanceResultDTO[], uploadedBy: string): Promise<IAcceptance[]> {
        const data = await this.verifyUpload(dtoList);
        const freelanceContractInitializer = new FreelanceContractInitializer();
        return commitUpload(data, acceptanceRepository, uploadedBy, async (dto, s) => {
            const freelance_contract = await freelanceContractInitializer.init(dto, uploadedBy, s);
            return this.create({ ...dto, freelance_contract }, uploadedBy, s);
        });
    }

    private calculateRemainingValue(executionValue = 0, acceptanceValue = 0) {
        return executionValue - acceptanceValue;
    }
}

export default new AcceptanceService();

import { BaseService } from "./baseService";
import { IBudget } from "../types/models/IBudget";
import { UpdateBudgetDTO, UploadBudgetDTO, UploadBudgetResultDTO } from "../types/dtos/budget";
import { IUploadService } from "../types/interfaces/service";
import budgetRepository from "../repositories/budgetRepository";
import { BudgetError } from "../errors/budgetErrors";
import { AnyKeys, ClientSession } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { initCache } from "../utils/cache";
import { IFreelanceContract } from "../types/models/IFreelanceContract";
import freelanceContractRepository from "../repositories/freelanceContractRepository";
import { FreelanceContractResultDTO } from "../dtos/freelanceContract";
import { FreelanceContractInitializer } from "../utils/initializer/FreelanceContractInitializer";

class BudgetService
    extends BaseService<IBudget, any, UpdateBudgetDTO>
    implements IUploadService<UploadBudgetDTO, IBudget, UploadBudgetResultDTO>
{
    constructor() {
        super(budgetRepository, { NOT_FOUND: BudgetError.NOT_FOUND });
    }

    async _beforeCreate(
        dto: Partial<IBudget>,
        createdBy: string,
        session: ClientSession | undefined
    ): Promise<Partial<IBudget>> {
        return { ...dto };
    }

    async _beforeUpdate(dto: UpdateBudgetDTO, updatedBy: string, existed: IBudget): Promise<AnyKeys<IBudget>> {
        return { ...dto };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IBudget> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IBudget,
        dto: UpdateBudgetDTO,
        updatedBy: string
    ): Promise<void> {
        return;
    }

    async verifyUpload(dtoList: UploadBudgetDTO[]): Promise<UploadBudgetResultDTO[]> {
        const getFreelanceContractCache = initCache<IFreelanceContract>((code) =>
            freelanceContractRepository.findByCode(code)
        );
        // TODO: Cost Type
        return verifyUpload(dtoList, async (dto) => {
            const freelanceContract = await getFreelanceContractCache(dto.freelance_contract_code);
            return {
                ...dto,
                freelance_contract: freelanceContract && new FreelanceContractResultDTO(freelanceContract),
            };
        });
    }

    async commitUpload(dtoList: UploadBudgetResultDTO[], uploadedBy: string): Promise<IBudget[]> {
        const data = await this.verifyUpload(dtoList);
        const freelanceContractInitializer = new FreelanceContractInitializer();
        // TODO: Cost Type
        return commitUpload(data, budgetRepository, uploadedBy, async (dto, s) => {
            const freelance_contract = await freelanceContractInitializer.init(dto, uploadedBy, s);
            return this.create({ ...dto, freelance_contract, cost_type: {} }, uploadedBy, s);
        });
    }
}

export default new BudgetService();

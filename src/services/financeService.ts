import { BaseService } from "./baseService";
import { IFinance } from "../types/models/IFinance";
import { UpdateFinanceDTO, UploadFinanceDTO, UploadFinanceResultDTO } from "../types/dtos/finance";
import { IUploadService } from "../types/interfaces/service";
import financeRepository from "../repositories/financeRepository";
import { FinanceError } from "../errors/financeErrors";
import { AnyKeys, ClientSession } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { initCache } from "../utils/cache";
import { IMainContract } from "../types/models/IMainContract";
import mainContractRepository from "../repositories/mainContractRepository";
import { MainContractResultDTO } from "../dtos/mainContract";
import { MainContractInitializer } from "../utils/initializer/MainContractInitializer";

class FinanceService
    extends BaseService<IFinance, any, UpdateFinanceDTO>
    implements IUploadService<UploadFinanceDTO, IFinance, UploadFinanceResultDTO>
{
    constructor() {
        super(financeRepository, { NOT_FOUND: FinanceError.NOT_FOUND });
    }

    async _beforeCreate(
        dto: Partial<IFinance>,
        createdBy: string,
        session: ClientSession | undefined
    ): Promise<Partial<IFinance>> {
        const calculatedValues = this.calculateAllValue(
            dto.contract_distributed_value,
            dto.contract_execution_value,
            dto.contract_rate,
            dto.settlement_distributed_value,
            dto.settlement_execution_value,
            dto.settlement_rate
        );
        return {
            ...dto,
            ...calculatedValues,
        };
    }

    async _beforeUpdate(dto: UpdateFinanceDTO, updatedBy: string, existed: IFinance): Promise<AnyKeys<IFinance>> {
        const calculatedValues = this.calculateAllValue(
            dto.contract_distributed_value || existed.contract_distributed_value,
            dto.contract_execution_value || existed.contract_execution_value,
            dto.contract_rate || existed.contract_rate,
            dto.settlement_distributed_value || existed.settlement_distributed_value,
            dto.settlement_execution_value || existed.settlement_execution_value,
            dto.settlement_rate || existed.settlement_rate
        );
        return { ...dto, ...calculatedValues };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IFinance> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IFinance,
        dto: UpdateFinanceDTO,
        updatedBy: string
    ): Promise<void> {
        return;
    }

    async verifyUpload(dtoList: UploadFinanceDTO[]): Promise<UploadFinanceResultDTO[]> {
        const getMainContractCache = initCache<IMainContract>((code) => mainContractRepository.findByCode(code));
        return verifyUpload(dtoList, async (dto) => {
            const mainContract = await getMainContractCache(dto.main_contract_code);
            return { ...dto, main_contract: mainContract && new MainContractResultDTO(mainContract) };
        });
    }

    async commitUpload(dtoList: UploadFinanceResultDTO[], uploadedBy: string): Promise<IFinance[]> {
        const data = await this.verifyUpload(dtoList);
        const mainContractInitializer = new MainContractInitializer();
        return commitUpload(data, financeRepository, uploadedBy, async (dto, s) => {
            const main_contract = await mainContractInitializer.init(dto, uploadedBy, s);
            return this.create({ ...dto, main_contract }, uploadedBy, s);
        });
    }

    calculateAllValue(
        contractDistributedValue = 0,
        contractExecutionValue = 0,
        contractRate = 0,
        settlementDistributedValue = 0,
        settlementExecutionValue = 0,
        settlementRate = 0
    ) {
        const contract_retention_value = this.calculateContractRetentionValue(
            contractDistributedValue,
            contractExecutionValue
        );
        const contract_final_value = this.calculateContractFinalValue(contractDistributedValue, contractRate);
        const contract_net_profit = this.calculateContractNetProfit(contract_retention_value, contract_final_value);

        const settlement_retention_value = this.calculateSettlementRetentionValue(
            contract_final_value,
            contract_net_profit
        );
        const settlement_final_value = this.calculateSettlementFinalValue(settlementDistributedValue, settlementRate);
        const settlement_net_profit = this.calculateSettlementNetProfit(
            settlement_retention_value,
            settlement_final_value
        );
        return {
            contract_retention_value,
            contract_final_value,
            contract_net_profit,
            settlement_retention_value,
            settlement_final_value,
            settlement_net_profit,
        };
    }

    calculateContractRetentionValue(distributedValue = 0, executionValue = 0) {
        return distributedValue - executionValue;
    }

    calculateContractFinalValue(distributedValue = 0, rate = 0) {
        return distributedValue * rate;
    }

    calculateContractNetProfit(retentionValue = 0, finalValue = 0) {
        return retentionValue - finalValue;
    }

    calculateSettlementRetentionValue(contractFinalValue = 0, contractNetProfit = 0) {
        return contractFinalValue - contractNetProfit;
    }

    calculateSettlementFinalValue(distributedValue = 0, rate = 0) {
        return distributedValue * rate;
    }

    calculateSettlementNetProfit(retentionValue = 0, finalValue = 0) {
        return retentionValue - finalValue;
    }
}

export default new FinanceService();

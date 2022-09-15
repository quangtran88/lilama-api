import { BaseService } from "./baseService";
import { IIncome } from "../types/models/IIncome";
import { UpdateIncomeDTO, UploadIncomeDTO, UploadIncomeResultDTO } from "../types/dtos/income";
import { IUploadService } from "../types/interfaces/service";
import IncomeRepository from "../repositories/incomeRepository";
import incomeRepository from "../repositories/incomeRepository";
import { IncomeError } from "../errors/incomeErrors";
import { AnyKeys } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { initCache } from "../utils/cache";
import { IMainContract } from "../types/models/IMainContract";
import mainContractRepository from "../repositories/mainContractRepository";
import { MainContractResultDTO } from "../dtos/mainContract";
import { MainContractInitializer } from "../utils/initializer/MainContractInitializer";

class IncomeService
    extends BaseService<IIncome, any, UpdateIncomeDTO>
    implements IUploadService<UploadIncomeDTO, IIncome, UploadIncomeResultDTO>
{
    constructor() {
        super(IncomeRepository, { NOT_FOUND: IncomeError.NOT_FOUND });
    }

    async _beforeCreate(dto: Partial<IIncome>, createdBy: string): Promise<Partial<IIncome>> {
        return dto;
    }

    async _beforeUpdate(dto: UpdateIncomeDTO, updatedBy: string, existed: IIncome): Promise<AnyKeys<IIncome>> {
        return dto;
    }

    _mapSearchToQuery(search: any): _FilterQuery<IIncome> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IIncome,
        dto: UpdateIncomeDTO,
        updatedBy: string
    ): Promise<void> {
        return;
    }

    async commitUpload(dtoList: UploadIncomeResultDTO[], uploadedBy: string): Promise<IIncome[]> {
        const data = await this.verifyUpload(dtoList);
        const mainContractInitializer = new MainContractInitializer();
        return commitUpload(data, incomeRepository, uploadedBy, async (dto, s) => {
            const main_contract = await mainContractInitializer.init(dto, uploadedBy, s);
            return this.create({ ...dto, main_contract }, uploadedBy, s);
        });
    }

    async verifyUpload(dtoList: UploadIncomeDTO[]): Promise<UploadIncomeResultDTO[]> {
        const getMainContractCache = initCache<IMainContract>((code) => mainContractRepository.findByCode(code));
        return verifyUpload(dtoList, async (dto, line) => {
            const mainContract = await getMainContractCache(dto.main_contract_code);
            return { ...dto, main_contract: mainContract && new MainContractResultDTO(mainContract) };
        });
    }
}

export default new IncomeService();

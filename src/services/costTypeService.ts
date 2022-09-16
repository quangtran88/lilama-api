import { BaseService } from "./baseService";
import { ICostType } from "../types/models/ICostType";
import { UpdateCostTypeDTO, UploadCostTypeDTO, UploadCostTypeResultDTO } from "../types/dtos/costType";
import { AnyKeys } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import CostTypeRepository from "../repositories/costTypeRepository";
import { CostTypeError } from "../errors/costTypeErrors";
import { IUploadService } from "../types/interfaces/service";
import { commitUpload, verifyUpload } from "../utils/upload";
import { UploadError } from "../errors/base";
//import fcBudgetRepository from "../repositories/fcBudgetRepository";
//import executionRepository from "../repositories/executionRepository";
import { TEMP_CODE } from "../config/common";

class CostTypeService
    extends BaseService<ICostType, any, UpdateCostTypeDTO>
    implements IUploadService<UploadCostTypeDTO, ICostType, UploadCostTypeResultDTO>
{
    //dependencyRepo = [fcBudgetRepository, executionRepository];
    //dependencyField = "costType";
    tempQuery = { code: TEMP_CODE };
    tempData = { code: TEMP_CODE };

    constructor() {
        super(CostTypeRepository, {
            NOT_FOUND: CostTypeError.NOT_FOUND,
        });
    }

    async _beforeCreate(dto: any, createdBy: string): Promise<Partial<ICostType>> {
        return { ...dto, need_review: true };
    }

    async _beforeUpdate(dto: UpdateCostTypeDTO, updatedBy: string, existed: ICostType): Promise<AnyKeys<ICostType>> {
        return { ...dto, need_review: false };
    }

    _mapSearchToQuery(search: any): _FilterQuery<ICostType> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: ICostType,
        dto: UpdateCostTypeDTO,
        updatedBy: string
    ) {
        if (existed.need_review) {
            await dependencyRepo.updateMany(
                { "costType.code": existed.code },
                { "costType.need_review": false },
                updatedBy
            );
        }
    }

    async commitUpload(dtoList: UploadCostTypeResultDTO[], uploadedBy: string): Promise<ICostType[]> {
        const data = await this.verifyUpload(dtoList);
        return commitUpload(data, CostTypeRepository, uploadedBy, async (dto, s) => {
            return this.create(dto, uploadedBy, s);
        });
    }

    verifyUpload(dtoList: UploadCostTypeDTO[]): Promise<UploadCostTypeResultDTO[]> {
        const existedCode: Set<string> = new Set();
        return verifyUpload(dtoList, async (dto, lineNumber) => {
            const existed = await CostTypeRepository.findByCode(dto.code);
            
            if (existed) return;

            if (existedCode.has(dto.code)) {
                throw new UploadError("Duplicated code", lineNumber);
            }
            existedCode.add(dto.code);
            return dto;
        });
    }
}

export default new CostTypeService();

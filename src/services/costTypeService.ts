import { BaseService } from "./baseService";
import { ICostType } from "../types/models/ICostType";
import { UpdateCostTypeDTO, UploadCostTypeDTO, UploadCostTypeResultDTO } from "../types/dtos/costType";
import { IUploadService } from "../types/interfaces/service";
import costTypeRepository from "../repositories/costTypeRepository";
import { CostTypeError } from "../errors/costTypeErrors";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { AnyKeys, ClientSession } from "mongoose";
import { TEMP_CODE } from "../config/common";
import { HTTPError, UploadError } from "../errors/base";
import { PartialExceptFor } from "../types/common";
import { commitUpload, verifyUpload } from "../utils/upload";

class CostTypeService
    extends BaseService<ICostType, any, UpdateCostTypeDTO>
    implements IUploadService<UploadCostTypeDTO, ICostType, UploadCostTypeResultDTO>
{
    dependencyRepo = [];
    dependencyField = "cost_type";
    tempQuery = { code: TEMP_CODE };
    tempData = { code: TEMP_CODE };

    constructor() {
        super(costTypeRepository, { NOT_FOUND: CostTypeError.NOT_FOUND });
    }

    async _beforeCreate(
        dto: PartialExceptFor<ICostType, "code">,
        createdBy: string,
        session: ClientSession | undefined
    ): Promise<Partial<ICostType>> {
        const existed = await costTypeRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(CostTypeError.CODE_EXISTED);
        }
        return { ...dto };
    }

    async _beforeUpdate(dto: UpdateCostTypeDTO, updatedBy: string, existed: ICostType): Promise<AnyKeys<ICostType>> {
        return { ...dto };
    }

    _mapSearchToQuery(search: any): _FilterQuery<ICostType> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: ICostType,
        dto: UpdateCostTypeDTO,
        updatedBy: string
    ): Promise<void> {
        if (dto.name) {
            await dependencyRepo.updateMany(
                { "cost_type.code": existed.code },
                { "cost_type.name": dto.name },
                updatedBy
            );
        }
    }

    async commitUpload(dtoList: UploadCostTypeResultDTO[], uploadedBy: string): Promise<ICostType[]> {
        const data = await this.verifyUpload(dtoList);
        return commitUpload(data, costTypeRepository, uploadedBy, async (dto, s) => {
            return this.create(dto, uploadedBy, s);
        });
    }

    async verifyUpload(dtoList: UploadCostTypeDTO[]): Promise<UploadCostTypeResultDTO[]> {
        const existedCode: Set<string> = new Set();
        return verifyUpload(dtoList, async (dto, line) => {
            const existed = await costTypeRepository.findByCode(dto.code);
            if (existed) return;

            if (existedCode.has(dto.code)) {
                throw new UploadError("Duplicated code", line);
            }
            existedCode.add(dto.code);
            return dto;
        });
    }
}

export default new CostTypeService();

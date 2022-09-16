import { BaseService } from "./baseService";
import { IManager } from "../types/models/IManager";
import { UpdateManagerDTO, UploadManagerDTO, UploadManagerResultDTO } from "../types/dtos/manager";
import { IUploadService } from "../types/interfaces/service";
import managerRepository from "../repositories/managerRepository";
import { ManagerError } from "../errors/managerErrors";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { AnyKeys, ClientSession } from "mongoose";
import { TEMP_CODE } from "../config/common";
import { HTTPError, UploadError } from "../errors/base";
import { PartialExceptFor } from "../types/common";
import { commitUpload, verifyUpload } from "../utils/upload";

class ManagerService
    extends BaseService<IManager, any, UpdateManagerDTO>
    implements IUploadService<UploadManagerDTO, IManager, UploadManagerResultDTO>
{
    dependencyRepo = [];
    dependencyField = "manager";
    tempQuery = { code: TEMP_CODE };
    tempData = { code: TEMP_CODE };

    constructor() {
        super(managerRepository, { NOT_FOUND: ManagerError.NOT_FOUND });
    }

    async _beforeCreate(
        dto: PartialExceptFor<IManager, "code">,
        createdBy: string,
        session: ClientSession | undefined
    ): Promise<Partial<IManager>> {
        const existed = await managerRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ManagerError.CODE_EXISTED);
        }
        return { ...dto, need_review: true };
    }

    async _beforeUpdate(dto: UpdateManagerDTO, updatedBy: string, existed: IManager): Promise<AnyKeys<IManager>> {
        return { ...dto, need_review: false };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IManager> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IManager,
        dto: UpdateManagerDTO,
        updatedBy: string
    ): Promise<void> {
        if (existed.need_review) {
            await dependencyRepo.updateMany(
                { "manager.code": existed.code },
                { "manager.need_review": false },
                updatedBy
            );
        }
    }

    async commitUpload(dtoList: UploadManagerResultDTO[], uploadedBy: string): Promise<IManager[]> {
        const data = await this.verifyUpload(dtoList);
        return commitUpload(data, managerRepository, uploadedBy, async (dto, s) => {
            return this.create(dto, uploadedBy, s);
        });
    }

    async verifyUpload(dtoList: UploadManagerDTO[]): Promise<UploadManagerResultDTO[]> {
        const existedCode: Set<string> = new Set();
        return verifyUpload(dtoList, async (dto, line) => {
            const existed = await managerRepository.findByCode(dto.code);
            if (existed) return;

            if (existedCode.has(dto.code)) {
                throw new UploadError("Duplicated code", line);
            }
            existedCode.add(dto.code);
            return dto;
        });
    }
}

export default new ManagerService();

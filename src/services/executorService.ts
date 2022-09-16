import { BaseService } from "./baseService";
import { IExecutor } from "../types/models/IExecutor";
import { UpdateExecutorDTO, UploadExecutorDTO, UploadExecutorResultDTO } from "../types/dtos/executor";
import { IUploadService } from "../types/interfaces/service";
import executorRepository from "../repositories/executorRepository";
import { ExecutorError } from "../errors/executorErrors";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { AnyKeys, ClientSession } from "mongoose";
import { TEMP_CODE } from "../config/common";
import { HTTPError, UploadError } from "../errors/base";
import { PartialExceptFor } from "../types/common";
import { commitUpload, verifyUpload } from "../utils/upload";

class ExecutorService
    extends BaseService<IExecutor, any, UpdateExecutorDTO>
    implements IUploadService<UploadExecutorDTO, IExecutor, UploadExecutorResultDTO>
{
    dependencyRepo = [];
    dependencyField = "executor";
    tempQuery = { code: TEMP_CODE };
    tempData = { code: TEMP_CODE };

    constructor() {
        super(executorRepository, { NOT_FOUND: ExecutorError.NOT_FOUND });
    }

    async _beforeCreate(
        dto: PartialExceptFor<IExecutor, "code">,
        createdBy: string,
        session: ClientSession | undefined
    ): Promise<Partial<IExecutor>> {
        const existed = await executorRepository.findByCode(dto.code);
        if (existed) {
            throw new HTTPError(ExecutorError.CODE_EXISTED);
        }
        return { ...dto, need_review: true };
    }

    async _beforeUpdate(dto: UpdateExecutorDTO, updatedBy: string, existed: IExecutor): Promise<AnyKeys<IExecutor>> {
        return { ...dto, need_review: false };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IExecutor> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IExecutor,
        dto: UpdateExecutorDTO,
        updatedBy: string
    ): Promise<void> {
        if (existed.need_review) {
            await dependencyRepo.updateMany(
                { "executor.code": existed.code },
                { "executor.need_review": false },
                updatedBy
            );
        }
    }

    async commitUpload(dtoList: UploadExecutorResultDTO[], uploadedBy: string): Promise<IExecutor[]> {
        const data = await this.verifyUpload(dtoList);
        return commitUpload(data, executorRepository, uploadedBy, async (dto, s) => {
            return this.create(dto, uploadedBy, s);
        });
    }

    async verifyUpload(dtoList: UploadExecutorDTO[]): Promise<UploadExecutorResultDTO[]> {
        const existedCode: Set<string> = new Set();
        return verifyUpload(dtoList, async (dto, line) => {
            const existed = await executorRepository.findByCode(dto.code);
            if (existed) return;

            if (existedCode.has(dto.code)) {
                throw new UploadError("Duplicated code", line);
            }
            existedCode.add(dto.code);
            return dto;
        });
    }
}

export default new ExecutorService();

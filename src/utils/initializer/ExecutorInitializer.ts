import { Initializer } from "./Initializer";
import { IExecutor } from "../../types/models/IExecutor";
import { ClientSession } from "mongoose";
import executorRepository from "../../repositories/executorRepository";
import executorService from "../../services/executorService";

interface IExecutorCode {
    executor_code: string;
    executor?: null | {
        id: string;
    };
}

export class ExecutorInitializer<DTO extends IExecutorCode> extends Initializer<IExecutor, DTO> {
    protected async getData(dto: DTO, uploadedBy: string, s: ClientSession): Promise<IExecutor | null> {
        await executorRepository.addContributor([dto.executor!.id], uploadedBy, s);
        return executorRepository.findById(dto.executor!.id);
    }

    protected getKey(dto: DTO): string {
        return dto.executor_code;
    }

    protected insert(dto: DTO, updatedBy: string, s: ClientSession): Promise<IExecutor> {
        return executorService.create({ code: dto.executor_code }, updatedBy, s);
    }

    protected shouldInsert(dto: DTO): boolean {
        return !dto.executor?.id;
    }
}

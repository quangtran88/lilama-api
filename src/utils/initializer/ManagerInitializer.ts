import { Initializer } from "./Initializer";
import { IManager } from "../../types/models/IManager";
import { ClientSession } from "mongoose";
import managerRepository from "../../repositories/managerRepository";
import managerService from "../../services/managerService";

interface IManagerCode {
    manager_code: string;
    manager?: null | {
        id: string;
    };
}

export class ManagerInitializer<DTO extends IManagerCode> extends Initializer<IManager, DTO> {
    protected async getData(dto: DTO, uploadedBy: string, s: ClientSession): Promise<IManager | null> {
        await managerRepository.addContributor([dto.manager!.id], uploadedBy, s);
        return managerRepository.findById(dto.manager!.id);
    }

    protected getKey(dto: DTO): string {
        return dto.manager_code;
    }

    protected insert(dto: DTO, updatedBy: string, s: ClientSession): Promise<IManager> {
        return managerService.create({ code: dto.manager_code }, updatedBy, s);
    }

    protected shouldInsert(dto: DTO): boolean {
        return !dto.manager?.id;
    }
}

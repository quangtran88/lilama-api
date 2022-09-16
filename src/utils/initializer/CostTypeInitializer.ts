import { Initializer } from "./Initializer";
import { ICostType } from "../../types/models/ICostType";
import { ClientSession } from "mongoose";
import costTypeRepository from "../../repositories/costTypeRepository";
import costTypeService from "../../services/costTypeService";

interface ICostTypeCode {
    costType_code: string;
    costType?: null | {
        id: string;
    };
}

export class CostTypeInitializer<DTO extends ICostTypeCode> extends Initializer<ICostType, DTO> {
    protected async getData({ costType }: DTO, updatedBy: string, s: ClientSession): Promise<ICostType | null> {
        await costTypeRepository.addContributor([costType!.id], updatedBy);
        return costTypeRepository.findById(costType!.id);
    }

    protected getKey(dto: DTO): string {
        return dto.costType_code;
    }

    protected insert({ costType_code }: DTO, updatedBy: string, s: ClientSession): Promise<ICostType> {
        return costTypeService.create({ code: costType_code }, updatedBy, s);
    }

    protected shouldInsert({ costType }: DTO): boolean {
        return !costType?.id;
    }
}

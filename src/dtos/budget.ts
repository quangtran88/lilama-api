import { BaseResultDTO } from "./base";
import { Types } from "mongoose";
import { IBudget } from "../types/models/IBudget";
import { mapId } from "../utils/dto";

export class BudgetResultDTO extends BaseResultDTO {
    freelance_contract: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    cost_type: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    description?: string;
    value?: number;

    constructor(acceptance: IBudget) {
        super(acceptance);
        this.freelance_contract = mapId(acceptance.freelance_contract);
        this.cost_type = mapId(acceptance.cost_type);
        this.description = acceptance.description;
        this.value = acceptance.value;
    }
}

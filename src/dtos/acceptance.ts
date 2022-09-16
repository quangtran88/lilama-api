import { BaseResultDTO } from "./base";
import { Types } from "mongoose";
import { IAcceptance } from "../types/models/IAcceptance";
import { mapId } from "../utils/dto";

export class AcceptanceResultDTO extends BaseResultDTO {
    freelance_contract: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    description?: string;
    execution_value?: number;
    invoice_date?: Date;
    new_distributed_value?: number;
    remaining_value?: number;

    constructor(acceptance: IAcceptance) {
        super(acceptance);
        this.freelance_contract = mapId(acceptance.freelance_contract);
        this.description = acceptance.description;
        this.execution_value = acceptance.execution_value;
        this.invoice_date = acceptance.invoice_date;
        this.new_distributed_value = acceptance.new_distributed_value;
        this.remaining_value = acceptance.remaining_value;
    }
}

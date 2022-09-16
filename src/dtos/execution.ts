import { BaseResultDTO } from "./base";
import { Types } from "mongoose";
import { IExecution } from "../types/models/IExecution";
import { mapId } from "../utils/dto";

export class ExecutionResultDTO extends BaseResultDTO {
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
    payment_request_code?: string;
    payment_request_date?: Date;
    payment_request_note?: string;
    payment_request_value?: number;
    expense_date?: Date;
    document_codes?: string;
    document_dates?: string;
    vendor?: string;
    marking?: string;

    constructor(acceptance: IExecution) {
        super(acceptance);
        this.freelance_contract = mapId(acceptance.freelance_contract);
        this.cost_type = mapId(acceptance.cost_type);
        this.payment_request_code = acceptance.payment_request_code;
        this.payment_request_date = acceptance.payment_request_date;
        this.payment_request_note = acceptance.payment_request_note;
        this.payment_request_value = acceptance.payment_request_value;
        this.expense_date = acceptance.expense_date;
        this.document_codes = acceptance.document_codes;
        this.document_dates = acceptance.document_dates;
        this.vendor = acceptance.vendor;
        this.marking = acceptance.marking;
    }
}

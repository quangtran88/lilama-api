import { BaseResultDTO } from "./base";
import { Types } from "mongoose";
import { IIncome } from "../types/models/IIncome";
import { mapId } from "../utils/dto";

export class IncomeResultDTO extends BaseResultDTO {
    main_contract: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    acceptance_note?: string;
    acceptance_value?: number;
    invoice_code?: string;
    invoice_date?: Date;
    vat_10?: number;
    vat_8?: number;
    taxable_value?: number;
    payment_request_code?: string;
    payment_request_date?: Date;
    payment_request_value?: number;
    advance_refund_value?: number;
    retention_value?: number;
    received_date?: Date;
    received_value?: number;
    deduction_value?: number;
    note?: string;
    is_advance_payment: boolean;
    remaining_advance_refund?: number;
    payment_request_debt?: number;

    constructor(income: IIncome) {
        super(income);
        this.main_contract = mapId(income.main_contract);
        this.acceptance_note = income.acceptance_note;
        this.acceptance_value = income.acceptance_value;
        this.invoice_code = income.invoice_code;
        this.invoice_date = income.invoice_date;
        this.vat_10 = income.vat_10;
        this.vat_8 = income.vat_8;
        this.taxable_value = income.taxable_value;
        this.payment_request_code = income.payment_request_code;
        this.payment_request_date = income.payment_request_date;
        this.payment_request_value = income.payment_request_value;
        this.advance_refund_value = income.advance_refund_value;
        this.retention_value = income.retention_value;
        this.received_date = income.received_date;
        this.received_value = income.received_value;
        this.deduction_value = income.deduction_value;
        this.note = income.note;
        this.is_advance_payment = income.is_advance_payment;
        this.remaining_advance_refund = income.remaining_advance_refund;
        this.payment_request_debt = income.payment_request_debt;
    }
}

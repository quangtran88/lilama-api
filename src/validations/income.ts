import { z } from "zod";
import { zodDate } from "../utils/validation";
import { IdDTOValidation } from "./base";

export const UploadIncomeDTOValidation = z.object({
    main_contract_code: z.string(),
    acceptance_note: z.string().optional(),
    acceptance_value: z.number().optional(),
    invoice_code: z.string().optional(),
    invoice_date: zodDate(),
    vat_10: z.number().optional(),
    vat_8: z.number().optional(),
    taxable_value: z.number().optional(),
    payment_request_code: z.string().optional(),
    payment_request_date: zodDate(),
    payment_request_value: z.number().optional(),
    advance_refund_value: z.number().optional(),
    retention_value: z.number().optional(),
    received_date: z.number().optional(),
    received_value: z.number().optional(),
    deduction_value: z.number().optional(),
    remaining_advance_refund: z.number().optional(),
    payment_request_debt: z.number().optional(),
    note: z.string().optional(),
});

export const UpdateIncomeDTOValidation = IdDTOValidation.extend({
    main_contract_code: z.string().optional(),
    acceptance_note: z.string().optional(),
    acceptance_value: z.number().optional(),
    invoice_code: z.string().optional(),
    invoice_date: zodDate(),
    vat_10: z.number().optional(),
    vat_8: z.number().optional(),
    taxable_value: z.number().optional(),
    payment_request_code: z.string().optional(),
    payment_request_date: zodDate(),
    payment_request_value: z.number().optional(),
    advance_refund_value: z.number().optional(),
    retention_value: z.number().optional(),
    received_date: z.number().optional(),
    received_value: z.number().optional(),
    deduction_value: z.number().optional(),
    remaining_advance_refund: z.number().optional(),
    payment_request_debt: z.number().optional(),
    note: z.string().optional(),
});

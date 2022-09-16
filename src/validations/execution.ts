import { z } from "zod";
import { IdDTOValidation } from "./base";
import { zodDate } from "../utils/validation";

export const UploadExecutionDTOValidation = z.object({
    freelance_contract_code: z.string(),
    cost_type_code: z.string(),
    payment_request_code: z.string().optional(),
    payment_request_date: zodDate(),
    payment_request_note: z.string().optional(),
    payment_request_value: z.number().optional(),
    expense_date: zodDate(),
    document_codes: z.string().optional(),
    document_dates: z.string().optional(),
    vendor: z.string().optional(),
    marking: z.string().optional(),
});

export const UpdateExecutionDTOValidation = IdDTOValidation.extend({
    freelance_contract_code: z.string(),
    cost_type_code: z.string(),
    payment_request_code: z.string().optional(),
    payment_request_date: zodDate(),
    payment_request_note: z.string().optional(),
    payment_request_value: z.number().optional(),
    expense_date: zodDate(),
    document_codes: z.string().optional(),
    document_dates: z.string().optional(),
    vendor: z.string().optional(),
    marking: z.string().optional(),
});

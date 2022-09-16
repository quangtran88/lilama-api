import { z } from "zod";
import { zodDate } from "../utils/validation";
import { IdDTOValidation } from "./base";

export const UploadAcceptanceDTOValidation = z.object({
    freelance_contract_code: z.string(),
    description: z.string().optional(),
    execution_value: z.number().optional(),
    acceptance_value: z.number().optional(),
    invoice_date: zodDate(),
    new_distributed_value: z.number().optional(),
});

export const UpdateAcceptanceDTOValidation = IdDTOValidation.extend({
    freelance_contract_code: z.string(),
    description: z.string().optional(),
    execution_value: z.number().optional(),
    acceptance_value: z.number().optional(),
    invoice_date: zodDate(),
    new_distributed_value: z.number().optional(),
});

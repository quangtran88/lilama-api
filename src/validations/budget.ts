import { z } from "zod";
import { IdDTOValidation } from "./base";

export const UploadBudgetDTOValidation = z.object({
    freelance_contract_code: z.string(),
    cost_type_code: z.string(),
    description: z.string().optional(),
    value: z.number().optional(),
});

export const UpdateBudgetDTOValidation = IdDTOValidation.extend({
    freelance_contract_code: z.string(),
    cost_type_code: z.string(),
    description: z.string().optional(),
    value: z.number().optional(),
});

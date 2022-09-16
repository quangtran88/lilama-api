import { z } from "zod";
import { IdDTOValidation } from "./base";
import { zodYear } from "../utils/validation";

export const UploadFinanceDTOValidation = z.object({
    main_contract_code: z.string(),
    mc_value: z.number().optional(),
    contract_distributed_value: z.number().optional(),
    contract_execution_value: z.number().optional(),
    contract_year: zodYear(),
    contract_rate: z.number().optional(),
    settlement_distributed_value: z.number().optional(),
    settlement_execution_value: z.number().optional(),
    settlement_year: zodYear(),
    settlement_rate: z.number().optional(),
});

export const UpdateFinanceDTOValidation = IdDTOValidation.extend({
    main_contract_code: z.string(),
    mc_value: z.number().optional(),
    contract_distributed_value: z.number().optional(),
    contract_execution_value: z.number().optional(),
    contract_year: zodYear(),
    contract_rate: z.number().optional(),
    settlement_distributed_value: z.number().optional(),
    settlement_execution_value: z.number().optional(),
    settlement_year: zodYear(),
    settlement_rate: z.number().optional(),
});

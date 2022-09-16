import { z } from "zod";
import { IdDTOValidation } from "./base";
import { zodDate } from "../utils/validation";

export const UploadMainContractDTOValidation = z.object({
    code: z.string(),
    binding_package_code: z.string(),
    project_code: z.string(),
    customer_code: z.string(),
    value: z.number().optional(),
    description: z.string().optional(),
    signed_at: zodDate(),
});

export const UpdateMainContractDTOValidation = IdDTOValidation.extend({
    project_code: z.string().optional(),
    binding_package_code: z.string().optional(),
    customer_code: z.string().optional(),
    value: z.number().optional(),
    description: z.string().optional(),
    signed_at: zodDate(),
});

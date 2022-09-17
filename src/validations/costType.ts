import { z } from "zod";
import { IdDTOValidation } from "./base";

export const UploadCostTypeDTOValidation = z.object({
    code: z.string(),
    description: z.string().optional(),
    name: z.string().optional(),
});

export const UpdateCostTypeDTOValidation = IdDTOValidation.extend({
    description: z.string().optional(),
    name: z.string().optional(),
});

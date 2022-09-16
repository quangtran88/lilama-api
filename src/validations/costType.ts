import { z } from "zod";
import { IdDTOValidation } from "./base";

export const UploadCostTypeDTOValidation = z.object({
    code: z.string(),
    name: z.string().optional(),
    note: z.string().optional(),
});

export const UpdateCostTypeDTOValidation = IdDTOValidation.extend({
    name: z.string().optional(),
    note: z.string().optional(),
});

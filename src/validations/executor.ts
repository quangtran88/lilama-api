import { z } from "zod";
import { IdDTOValidation } from "./base";

export const UploadExecutorDTOValidation = z.object({
    code: z.string(),
    info: z.string().optional(),
});

export const UpdateExecutorDTOValidation = IdDTOValidation.extend({
    info: z.string().optional(),
});

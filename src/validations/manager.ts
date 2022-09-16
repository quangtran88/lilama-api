import { z } from "zod";
import { IdDTOValidation } from "./base";

export const UploadManagerDTOValidation = z.object({
    code: z.string(),
    info: z.string().optional(),
});

export const UpdateManagerDTOValidation = IdDTOValidation.extend({
    info: z.string().optional(),
});

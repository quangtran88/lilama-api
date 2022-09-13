import { z } from "zod";
import { IdDTOValidation } from "./base";

export const UploadBindingPackageDTOValidation = z.object({
    project_code: z.string(),
    code: z.string(),
    description: z.string().optional(),
});

export const UpdateBindingPackageDTOValidation = IdDTOValidation.extend({
    description: z.string().optional(),
});

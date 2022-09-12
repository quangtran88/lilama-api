import { z } from "zod";

export const UploadBindingPackageDTOValidation = z.object({
    project_code: z.string(),
    code: z.string(),
    description: z.string().optional(),
});

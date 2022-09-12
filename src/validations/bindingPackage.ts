import { z } from "zod";

export const UploadBindingPackageDTOValidation = z.object({
    projectCode: z.string(),
    code: z.string(),
    description: z.string().optional(),
});

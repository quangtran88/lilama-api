import { z } from "zod";
import { isOID } from "../utils/validation";

export const CreateProjectDTOValidation = z.object({
    code: z.string(),
    description: z.string().optional(),
});

export const UpdateProjectDTOValidation = z.object({
    id: z.string().refine((s) => isOID(s)),
    description: z.string().optional(),
});

export const UploadProjectDTOValidation = z.object({
    code: z.string(),
    description: z.string().optional(),
});

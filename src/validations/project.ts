import { z } from "zod";

export const CreateProjectDTOValidation = z.object({
    code: z.string(),
    description: z.string().optional(),
});

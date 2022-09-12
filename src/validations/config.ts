import { z } from "zod";

export const GetConfigDTOValidation = z.object({
    key: z.string(),
});

export const SetConfigDTOValidation = z.object({
    key: z.string(),
    value: z.string(),
});

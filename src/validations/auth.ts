import { z } from "zod";

export const LoginDTOValidation = z.object({
    username: z.string().min(5).max(20),
    password: z.string().min(8).max(20),
});

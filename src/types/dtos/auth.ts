import { z } from "zod";
import { LoginDTOValidation } from "../../validations/auth";

export type LoginDTO = z.infer<typeof LoginDTOValidation>;

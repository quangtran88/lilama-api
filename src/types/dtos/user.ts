import { z } from "zod";
import { CreateUserDTOValidation, UpdateUserDTOValidation } from "../../validations/user";

export type CreateUserDTO = z.infer<typeof CreateUserDTOValidation>;

export type UpdateUserDTO = z.infer<typeof UpdateUserDTOValidation>;

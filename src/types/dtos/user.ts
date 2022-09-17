import { z } from "zod";
import { ChangePasswordDTOValidation, CreateUserDTOValidation, UpdateUserDTOValidation } from "../../validations/user";

export type CreateUserDTO = z.infer<typeof CreateUserDTOValidation>;

export type UpdateUserDTO = z.infer<typeof UpdateUserDTOValidation>;

export type ChangePasswordDTO = z.infer<typeof ChangePasswordDTOValidation>;

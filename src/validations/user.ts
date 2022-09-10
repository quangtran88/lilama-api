import { UserPermission } from "../types/models/IUser";
import { z } from "zod";

export const CreateUserDTOValidation = z.object({
    username: z.string().min(5).max(20),
    password: z
        .string()
        .min(8)
        .max(20)
        .regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"), "Must contains at least one number and one character"),
    permission: z.enum([UserPermission.A, UserPermission.B, UserPermission.C, UserPermission.D]),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    full_name: z.string().optional(),
});

export const UpdateUserDTOValidation = z.object({
    id: z.string(),
    password: z
        .string()
        .min(8)
        .max(20)
        .regex(new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])"), "Must contains at least one number and one character")
        .optional(),
    permission: z.enum([UserPermission.A, UserPermission.B, UserPermission.C, UserPermission.D]).optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    full_name: z.string().optional(),
});

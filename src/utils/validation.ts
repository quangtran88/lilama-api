import { ZodError, ZodType } from "zod";
import { ValidationError } from "../errors/base";
import { Error, Types } from "mongoose";

export function validateZod<T>(schema: ZodType<T>, input: unknown) {
    try {
        return schema.parse(input);
    } catch (error) {
        if (error instanceof ZodError) {
            const firstIssue = error.issues[0];
            const fieldPath = firstIssue.path.join(".");
            const errorMessage = `[${fieldPath}] ${firstIssue.message}`;
            throw new ValidationError(errorMessage, fieldPath, firstIssue.message);
        }
        throw new Error(error as string);
    }
}

export function isOID(s: any) {
    return Types.ObjectId.isValid(s);
}

import { ZodError, ZodType } from "zod";
import { Types } from "mongoose";

export function validateZod<T>(schema: ZodType<T>, input: unknown) {
    return schema.parse(input);
}

export function isOID(s: any) {
    return Types.ObjectId.isValid(s);
}

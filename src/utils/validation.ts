import { ZodError, ZodType } from "zod";

export function validateZod<T>(schema: ZodType<T>, input: unknown) {
    return schema.parse(input);
}

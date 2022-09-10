import { ZodError, ZodType } from "zod";
import { HTTPError } from "../errors/base";
import { Error } from "mongoose";
import { StatusCodes } from "http-status-codes";

export function validateZod<T>(schema: ZodType<T>, input: unknown) {
    try {
        return schema.parse(input);
    } catch (error) {
        if (error instanceof ZodError) {
            const firstIssue = error.issues[0];
            const fieldPath = firstIssue.path.join(".");
            const errorMessage = `[${fieldPath}] ${firstIssue.message}`;
            throw new HTTPError([StatusCodes.BAD_REQUEST, errorMessage]);
        }
        throw new Error(error as string);
    }
}

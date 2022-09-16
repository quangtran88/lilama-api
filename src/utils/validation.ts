import { z, ZodError, ZodType } from "zod";
import { ValidationError } from "../errors/base";
import { Error, Types } from "mongoose";
import { PaginateDTOValidation } from "../validations/base";
import moment from "moment/moment";

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

export function validatePaginate(query: any): { page: number; limit: number } {
    let { page = 1, limit = 20 } = validateZod(PaginateDTOValidation, query);
    return { page: Number(page), limit: Number(limit) };
}

export function isOID(s: any) {
    return Types.ObjectId.isValid(s);
}

export function zodDate() {
    return z
        .preprocess((date) => {
            if (typeof date == "string") {
                if (date.includes("/")) return moment(date, "DD/MM/YYYY").utcOffset(-7).toISOString();
                else return moment(date).toDate();
            }
        }, z.date())
        .optional();
}

export function zodYear() {
    return z
        .preprocess((year) => {
            if (typeof year == "string") {
                return Number(year);
            }
            if (typeof year == "number") {
                return year;
            }
        }, z.number())
        .optional();
}

import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum IncomeErrorKey {
    NOT_FOUND = "NOT_FOUND",
}

export const IncomeError: ErrorSet<IncomeErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Income not found"],
};

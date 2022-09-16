import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum FinanceErrorKey {
    NOT_FOUND = "NOT_FOUND",
}

export const FinanceError: ErrorSet<FinanceErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Finance not found"],
};

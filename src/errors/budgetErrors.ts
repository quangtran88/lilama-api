import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum BudgetErrorKey {
    NOT_FOUND = "NOT_FOUND",
}

export const BudgetError: ErrorSet<BudgetErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Budget not found"],
};

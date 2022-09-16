import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum IncomeErrorKey {
    NOT_FOUND = "NOT_FOUND",
    EDIT_ADVANCE_PAYMENT_NOTE = "EDIT_ADVANCE_PAYMENT_NOTE",
}

export const IncomeError: ErrorSet<IncomeErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Income not found"],
    EDIT_ADVANCE_PAYMENT_NOTE: [StatusCodes.BAD_REQUEST, "Can not edit advance payment note"],
};

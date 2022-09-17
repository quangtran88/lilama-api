import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum CostTypeErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const CostTypeError: ErrorSet<CostTypeErrorKey> = {
    NOT_FOUND: [StatusCodes.NOT_FOUND, "Cost Type not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

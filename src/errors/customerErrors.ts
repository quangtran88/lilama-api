import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum CustomerErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const CustomerError: ErrorSet<CustomerErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Customer not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

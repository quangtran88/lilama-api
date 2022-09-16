import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum FreelanceContractErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const FreelanceContractError: ErrorSet<FreelanceContractErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Freelance Contract not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum MainContractErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const MainContractError: ErrorSet<MainContractErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Main Contract not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

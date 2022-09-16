import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum ManagerErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const ManagerError: ErrorSet<ManagerErrorKey> = {
    NOT_FOUND: [StatusCodes.NOT_FOUND, "Manager not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

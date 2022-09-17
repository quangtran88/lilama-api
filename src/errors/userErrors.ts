import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum UserErrorKey {
    NOT_FOUND = "NOT_FOUND",
    USERNAME_EXISTED = "USERNAME_EXISTED",
    BLOCKED = "BLOCKED",
    PASSWORD_NOT_MATCH = "PASSWORD_NOT_MATCH",
}

export const UserError: ErrorSet<UserErrorKey> = {
    NOT_FOUND: [StatusCodes.NOT_FOUND, "User not found"],
    USERNAME_EXISTED: [StatusCodes.CONFLICT, "Username existed"],
    BLOCKED: [StatusCodes.FORBIDDEN, "User blocked"],
    PASSWORD_NOT_MATCH: [StatusCodes.BAD_REQUEST, "Password not match"],
};

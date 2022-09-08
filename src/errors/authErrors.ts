import { ErrorSet, HTTPErrorTuple } from "./base";
import { StatusCodes } from "http-status-codes";

enum AuthErrorKey {
    NOT_AUTHENTICATED = "NOT_AUTHENTICATED",
    INVALID_AUTHENTICATION = "INVALID_AUTHENTICATION",
}

export const AuthError: ErrorSet<AuthErrorKey> = {
    NOT_AUTHENTICATED: [StatusCodes.UNAUTHORIZED, "Not authenticated"],
    INVALID_AUTHENTICATION: [StatusCodes.UNAUTHORIZED, "Username or password incorrect"],
};

import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum AcceptanceErrorKey {
    NOT_FOUND = "NOT_FOUND",
}

export const AcceptanceError: ErrorSet<AcceptanceErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Acceptance not found"],
};

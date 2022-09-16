import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum ExecutionErrorKey {
    NOT_FOUND = "NOT_FOUND",
}

export const ExecutionError: ErrorSet<ExecutionErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Execution not found"],
};

import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum ExecutorErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const ExecutorError: ErrorSet<ExecutorErrorKey> = {
    NOT_FOUND: [StatusCodes.NOT_FOUND, "Executor not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

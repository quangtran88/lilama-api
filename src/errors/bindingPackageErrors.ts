import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum BindingPackageErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const BindingPackageError: ErrorSet<BindingPackageErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Binding Package not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

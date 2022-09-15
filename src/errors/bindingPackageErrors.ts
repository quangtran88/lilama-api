import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum BindingPackageErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
    PROJECT_IS_SET = "PROJECT_IS_SET",
}

export const BindingPackageError: ErrorSet<BindingPackageErrorKey> = {
    NOT_FOUND: [StatusCodes.BAD_REQUEST, "Binding Package not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
    PROJECT_IS_SET: [StatusCodes.CONFLICT, "Another Project is set for this Binding Package"],
};

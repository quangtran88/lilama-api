import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum ProjectErrorKey {
    NOT_FOUND = "NOT_FOUND",
    CODE_EXISTED = "CODE_EXISTED",
}

export const ProjectError: ErrorSet<ProjectErrorKey> = {
    NOT_FOUND: [StatusCodes.NOT_FOUND, "Project not found"],
    CODE_EXISTED: [StatusCodes.CONFLICT, "Code existed"],
};

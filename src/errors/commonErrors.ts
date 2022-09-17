import { ErrorSet } from "./base";
import { StatusCodes } from "http-status-codes";

enum CommonErrorKey {
    UPDATE_TEMP_DATA = "UPDATE_TEMP_DATA",
}

export const CommonError: ErrorSet<CommonErrorKey> = {
    UPDATE_TEMP_DATA: [StatusCodes.BAD_REQUEST, "Can not update TEMP DATA"],
};

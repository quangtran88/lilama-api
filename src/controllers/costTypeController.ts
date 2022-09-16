import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";

import { CostTypeResultDTO } from "../dtos/costType";
import { UpdateCostTypeDTOValidation, UploadCostTypeDTOValidation } from "../validations/costType";
import costTypeService from "../services/costTypeService";
import { IMPORT_COSTTYPE_KEY } from "../config/excelMaping";

const PATH = "/cost-type";
const PATHS = "/cost-types";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, costTypeService, CostTypeResultDTO);

createGetDetailsRoute(r, PATH, costTypeService, CostTypeResultDTO);

createDisableRoute(r, PATH, costTypeService);

createUpdateRoute(r, PATH, UpdateCostTypeDTOValidation, costTypeService);

createUploadRoute(r, PATH, UploadCostTypeDTOValidation, IMPORT_COSTTYPE_KEY, costTypeService);

export default r.getRouter();

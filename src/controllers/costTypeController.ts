import {
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_COST_TYPE_KEY } from "../config/excelMaping";
import costTypeService from "../services/costTypeService";
import { UpdateCostTypeDTOValidation, UploadCostTypeDTOValidation } from "../validations/costType";
import { CostTypeResultDTO } from "../dtos/costType";

const PATH = "/cost-type";
const PATHS = "/cost-types";

const router = new CustomRouter();

createPaginateRoute(router, PATHS, costTypeService, CostTypeResultDTO);

createGetDetailsRoute(router, PATH, costTypeService, CostTypeResultDTO);

createUploadRoute(router, PATH, UploadCostTypeDTOValidation, IMPORT_COST_TYPE_KEY, costTypeService);

createUpdateRoute(router, PATH, UpdateCostTypeDTOValidation, costTypeService);

export default router.getRouter();

import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_MANAGER_KEY } from "../config/excelMaping";
import managerService from "../services/managerService";
import { UpdateManagerDTOValidation, UploadManagerDTOValidation } from "../validations/manager";
import { ManagerResultDTO } from "../dtos/manager";

const PATH = "/manager";
const PATHS = "/managers";

const router = new CustomRouter();

createPaginateRoute(router, PATHS, managerService, ManagerResultDTO);

createGetDetailsRoute(router, PATH, managerService, ManagerResultDTO);

createUploadRoute(router, PATH, UploadManagerDTOValidation, IMPORT_MANAGER_KEY, managerService);

createUpdateRoute(router, PATH, UpdateManagerDTOValidation, managerService);

createDisableRoute(router, PATH, managerService);

export default router.getRouter();

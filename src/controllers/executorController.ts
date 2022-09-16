import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_EXECUTOR_KEY } from "../config/excelMaping";
import executorService from "../services/executorService";
import { UpdateExecutorDTOValidation, UploadExecutorDTOValidation } from "../validations/executor";
import { ExecutorResultDTO } from "../dtos/executor";

const PATH = "/executor";
const PATHS = "/executors";

const router = new CustomRouter();

createPaginateRoute(router, PATHS, executorService, ExecutorResultDTO);

createGetDetailsRoute(router, PATH, executorService, ExecutorResultDTO);

createUploadRoute(router, PATH, UploadExecutorDTOValidation, IMPORT_EXECUTOR_KEY, executorService);

createUpdateRoute(router, PATH, UpdateExecutorDTOValidation, executorService);

createDisableRoute(router, PATH, executorService);

export default router.getRouter();

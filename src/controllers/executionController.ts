import {
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_EXECUTION_KEY } from "../config/excelMaping";
import executionService from "../services/executionService";
import { ExecutionResultDTO } from "../dtos/execution";
import { UpdateExecutionDTOValidation, UploadExecutionDTOValidation } from "../validations/execution";

const PATH = "/execution";
const PATHS = "/executions";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, executionService, ExecutionResultDTO);

createGetDetailsRoute(r, PATH, executionService, ExecutionResultDTO);

createUpdateRoute(r, PATH, UpdateExecutionDTOValidation, executionService);

createUploadRoute(r, PATH, UploadExecutionDTOValidation, IMPORT_EXECUTION_KEY, executionService);

export default r.getRouter();

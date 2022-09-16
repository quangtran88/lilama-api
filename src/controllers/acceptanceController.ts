import {
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_ACCEPTANCE_KEY } from "../config/excelMaping";
import acceptanceService from "../services/acceptanceService";
import { AcceptanceResultDTO } from "../dtos/acceptance";
import { UpdateAcceptanceDTOValidation, UploadAcceptanceDTOValidation } from "../validations/acceptance";

const PATH = "/acceptance";
const PATHS = "/acceptances";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, acceptanceService, AcceptanceResultDTO);

createGetDetailsRoute(r, PATH, acceptanceService, AcceptanceResultDTO);

createUpdateRoute(r, PATH, UpdateAcceptanceDTOValidation, acceptanceService);

createUploadRoute(r, PATH, UploadAcceptanceDTOValidation, IMPORT_ACCEPTANCE_KEY, acceptanceService);

export default r.getRouter();

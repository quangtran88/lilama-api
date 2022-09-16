import {
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_FINANCE_KEY } from "../config/excelMaping";
import financeService from "../services/financeService";
import { FinanceResultDTO } from "../dtos/finance";
import { UpdateFinanceDTOValidation, UploadFinanceDTOValidation } from "../validations/finance";

const PATH = "/finance";
const PATHS = "/finances";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, financeService, FinanceResultDTO);

createGetDetailsRoute(r, PATH, financeService, FinanceResultDTO);

createUpdateRoute(r, PATH, UpdateFinanceDTOValidation, financeService);

createUploadRoute(r, PATH, UploadFinanceDTOValidation, IMPORT_FINANCE_KEY, financeService);

export default r.getRouter();

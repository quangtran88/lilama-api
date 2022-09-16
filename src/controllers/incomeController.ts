import {
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_INCOME_KEY } from "../config/excelMaping";
import incomeService from "../services/incomeService";
import { IncomeResultDTO } from "../dtos/income";
import { UpdateIncomeDTOValidation, UploadIncomeDTOValidation } from "../validations/income";

const PATH = "/income";
const PATHS = "/incomes";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, incomeService, IncomeResultDTO);

createGetDetailsRoute(r, PATH, incomeService, IncomeResultDTO);

createUpdateRoute(r, PATH, UpdateIncomeDTOValidation, incomeService);

createUploadRoute(r, PATH, UploadIncomeDTOValidation, IMPORT_INCOME_KEY, incomeService);

export default r.getRouter();

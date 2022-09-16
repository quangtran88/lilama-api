import {
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_BUDGET_KEY } from "../config/excelMaping";
import budgetService from "../services/budgetService";
import { BudgetResultDTO } from "../dtos/budget";
import { UpdateBudgetDTOValidation, UploadBudgetDTOValidation } from "../validations/budget";

const PATH = "/budget";
const PATHS = "/budgets";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, budgetService, BudgetResultDTO);

createGetDetailsRoute(r, PATH, budgetService, BudgetResultDTO);

createUpdateRoute(r, PATH, UpdateBudgetDTOValidation, budgetService);

createUploadRoute(r, PATH, UploadBudgetDTOValidation, IMPORT_BUDGET_KEY, budgetService);

export default r.getRouter();

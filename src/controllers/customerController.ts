import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";

import { CustomerResultDTO } from "../dtos/customer";
import { UpdateCustomerDTOValidation, UploadCustomerDTOValidation } from "../validations/customer";
import customerService from "../services/customerService";
import { IMPORT_CUSTOMER_KEY } from "../config/excelMaping";

const PATH = "/customer";
const PATHS = "/customers";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, customerService, CustomerResultDTO);

createGetDetailsRoute(r, PATH, customerService, CustomerResultDTO);

createDisableRoute(r, PATH, customerService);

createUpdateRoute(r, PATH, UpdateCustomerDTOValidation, customerService);

createUploadRoute(r, PATH, UploadCustomerDTOValidation, IMPORT_CUSTOMER_KEY, customerService);

export default r.getRouter();

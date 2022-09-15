import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import mainContractService from "../services/mainContractService";
import { IMPORT_MAIN_CONTRACT_KEY } from "../config/excelMaping";
import { MainContractResultDTO } from "../dtos/mainContract";
import { UpdateMainContractDTOValidation, UploadMainContractDTOValidation } from "../validations/mainContract";

const PATH = "/main-contract";
const PATHS = "/main-contracts";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, mainContractService, MainContractResultDTO);

createGetDetailsRoute(r, PATH, mainContractService, MainContractResultDTO);

createDisableRoute(r, PATH, mainContractService);

createUpdateRoute(r, PATH, UpdateMainContractDTOValidation, mainContractService);

createUploadRoute(r, PATH, UploadMainContractDTOValidation, IMPORT_MAIN_CONTRACT_KEY, mainContractService);

export default r.getRouter();

import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import freelanceContractService from "../services/freelanceContractService";
import { IMPORT_FREELANCE_CONTRACT_KEY } from "../config/excelMaping";
import { FreelanceContractResultDTO } from "../dtos/freelanceContract";
import {
    UpdateFreelanceContractDTOValidation,
    UploadFreelanceContractDTOValidation,
} from "../validations/freelanceContract";

const PATH = "/freelance-contract";
const PATHS = "/freelance-contracts";

const r = new CustomRouter();

createPaginateRoute(r, PATHS, freelanceContractService, FreelanceContractResultDTO);

createGetDetailsRoute(r, PATH, freelanceContractService, FreelanceContractResultDTO);

createDisableRoute(r, PATH, freelanceContractService);

createUpdateRoute(r, PATH, UpdateFreelanceContractDTOValidation, freelanceContractService);

createUploadRoute(
    r,
    PATH,
    UploadFreelanceContractDTOValidation,
    IMPORT_FREELANCE_CONTRACT_KEY,
    freelanceContractService
);

export default r.getRouter();

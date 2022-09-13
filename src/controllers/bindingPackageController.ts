import {
    createDisableRoute,
    createGetDetailsRoute,
    createPaginateRoute,
    createUpdateRoute,
    createUploadRoute,
    CustomRouter,
} from "../utils/router";
import { IMPORT_BINDING_PACKAGE_KEY } from "../config/excelMaping";
import { UpdateBindingPackageDTOValidation, UploadBindingPackageDTOValidation } from "../validations/bindingPackage";
import bindingPackageService from "../services/bindingPackageService";
import { BindingPackageResultDTO } from "../dtos/bindingPackage";

const PATH = "/binding-package";
const PATHS = "/binding-packages";
const r = new CustomRouter();

createPaginateRoute(r, PATHS, bindingPackageService, BindingPackageResultDTO);

createGetDetailsRoute(r, PATH, bindingPackageService, BindingPackageResultDTO);

createDisableRoute(r, PATH, bindingPackageService);

createUpdateRoute(r, PATH, UpdateBindingPackageDTOValidation, bindingPackageService);

createUploadRoute(r, PATH, UploadBindingPackageDTOValidation, IMPORT_BINDING_PACKAGE_KEY, bindingPackageService);

export default r.getRouter();

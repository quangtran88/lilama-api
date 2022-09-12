import { CustomRouter } from "../utils/router";
import { allow } from "../utils/auth";
import { file, validateFile } from "../utils/upload";
import { IMPORT_BINDING_PACKAGE_KEY } from "../config/excelMaping";
import { success } from "../utils/response";
import { UploadBindingPackageDTOValidation } from "../validations/bindingPackage";
import bindingPackageService from "../services/bindingPackageService";

const r = new CustomRouter();

r.POST("/binding-package/upload/verify", allow(["D", "C"]), file(), async ({ file }) => {
    const dtoList = validateFile(file!.path, UploadBindingPackageDTOValidation, IMPORT_BINDING_PACKAGE_KEY);
    const result = await bindingPackageService.verifyUpload(dtoList);
    return success(result);
});

export default r.getRouter();

import { CustomRouter } from "../utils/router";
import { allow } from "../utils/auth";
import { file, validateFile } from "../utils/upload";
import { IMPORT_BINDING_PACKAGE_KEY } from "../config/excelMaping";
import { paginate, success } from "../utils/response";
import { UploadBindingPackageDTOValidation } from "../validations/bindingPackage";
import bindingPackageService from "../services/bindingPackageService";
import { validatePaginate, validateZod } from "../utils/validation";
import { z } from "zod";
import { BindingPackageResultDTO } from "../dtos/bindingPackage";

const r = new CustomRouter();

r.GET("/binding-packages", allow(["D", "C", "B"]), async ({ query, currentUser }) => {
    const { page, limit } = validatePaginate(query);
    const paginateData = await bindingPackageService.getPage(currentUser!, page, limit);
    const data = paginateData.docs.map((d) => new BindingPackageResultDTO(d));
    return paginate(data, paginateData);
});

r.POST("/binding-package/upload/verify", allow(["D", "C"]), file(), async ({ file }) => {
    const dtoList = validateFile(file!.path, UploadBindingPackageDTOValidation, IMPORT_BINDING_PACKAGE_KEY);
    const result = await bindingPackageService.verifyUpload(dtoList);
    return success(result);
});

r.POST("/binding-package/upload/commit", allow(["D", "C"]), async ({ body, currentUser }) => {
    const dtoList = validateZod(z.array(UploadBindingPackageDTOValidation), body.data);
    const created = await bindingPackageService.commitUpload(dtoList, currentUser!.username);
    return success({ createdIds: created.map((c) => c._id.toString()) });
});

export default r.getRouter();

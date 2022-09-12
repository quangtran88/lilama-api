import { UploadBindingPackageDTOValidation } from "../../validations/bindingPackage";
import { z } from "zod";

export type UploadBindingPackageDTO = z.infer<typeof UploadBindingPackageDTOValidation>;

export type UploadBindingPackageResultDTO = UploadBindingPackageDTO & {
    existedProject: boolean;
};

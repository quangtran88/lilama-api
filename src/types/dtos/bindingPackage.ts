import { UpdateBindingPackageDTOValidation, UploadBindingPackageDTOValidation } from "../../validations/bindingPackage";
import { z } from "zod";
import { ProjectResultDTO } from "../../dtos/project";

export type UploadBindingPackageDTO = z.infer<typeof UploadBindingPackageDTOValidation>;

export type UploadBindingPackageResultDTO = UploadBindingPackageDTO & {
    project?: ProjectResultDTO | null;
};

export type UpdateBindingPackageDTO = z.infer<typeof UpdateBindingPackageDTOValidation>;

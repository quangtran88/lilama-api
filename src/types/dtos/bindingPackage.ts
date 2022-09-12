import { UploadBindingPackageDTOValidation } from "../../validations/bindingPackage";
import { z } from "zod";
import { IProject } from "../models/IProject";

export type UploadBindingPackageDTO = z.infer<typeof UploadBindingPackageDTOValidation>;

export type UploadBindingPackageResultDTO = UploadBindingPackageDTO & {
    project: IProject | null;
};

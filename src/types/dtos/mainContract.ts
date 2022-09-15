import { z } from "zod";
import { UpdateMainContractDTOValidation, UploadMainContractDTOValidation } from "../../validations/mainContract";
import { ProjectResultDTO } from "../../dtos/project";
import { CustomerResultDTO } from "../../dtos/customer";
import { BindingPackageResultDTO } from "../../dtos/bindingPackage";

export type UploadMainContractDTO = z.infer<typeof UploadMainContractDTOValidation>;

export type UploadMainContractResultDTO = UploadMainContractDTO & {
    project?: ProjectResultDTO | null;
    customer?: CustomerResultDTO | null;
    binding_package?: BindingPackageResultDTO | null;
};

export type UpdateMainContractDTO = z.infer<typeof UpdateMainContractDTOValidation>;

import { z } from "zod";
import { UpdateCustomerDTOValidation, UploadCustomerDTOValidation } from "../../validations/customer";

export type UploadCustomerDTO = z.infer<typeof UploadCustomerDTOValidation>;

export type UploadCustomerResultDTO = UploadCustomerDTO;

export type UpdateCustomerDTO = z.infer<typeof UpdateCustomerDTOValidation>;

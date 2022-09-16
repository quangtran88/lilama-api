import { z } from "zod";
import { UpdateManagerDTOValidation, UploadManagerDTOValidation } from "../../validations/manager";

export type UploadManagerDTO = z.infer<typeof UploadManagerDTOValidation>;

export type UploadManagerResultDTO = UploadManagerDTO;

export type UpdateManagerDTO = z.infer<typeof UpdateManagerDTOValidation>;

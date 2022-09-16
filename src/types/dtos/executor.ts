import { z } from "zod";
import { UpdateExecutorDTOValidation, UploadExecutorDTOValidation } from "../../validations/executor";

export type UploadExecutorDTO = z.infer<typeof UploadExecutorDTOValidation>;

export type UploadExecutorResultDTO = UploadExecutorDTO;

export type UpdateExecutorDTO = z.infer<typeof UpdateExecutorDTOValidation>;

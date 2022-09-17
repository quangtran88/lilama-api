import { z } from "zod";
import { UpdateCostTypeDTOValidation, UploadCostTypeDTOValidation } from "../../validations/costType";

export type UploadCostTypeDTO = z.infer<typeof UploadCostTypeDTOValidation>;

export type UploadCostTypeResultDTO = UploadCostTypeDTO;

export type UpdateCostTypeDTO = z.infer<typeof UpdateCostTypeDTOValidation>;

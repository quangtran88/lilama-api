import { z } from "zod";
import { UpdateExecutionDTOValidation, UploadExecutionDTOValidation } from "../../validations/execution";
import { FreelanceContractResultDTO } from "../../dtos/freelanceContract";
import { CostTypeResultDTO } from "../../dtos/costType";

export type UploadExecutionDTO = z.infer<typeof UploadExecutionDTOValidation>;

export type UploadExecutionResultDTO = UploadExecutionDTO & {
    freelance_contract?: FreelanceContractResultDTO | null;
    cost_type?: CostTypeResultDTO | null;
};

export type UpdateExecutionDTO = z.infer<typeof UpdateExecutionDTOValidation>;

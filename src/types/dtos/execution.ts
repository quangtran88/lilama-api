import { z } from "zod";
import { UpdateExecutionDTOValidation, UploadExecutionDTOValidation } from "../../validations/execution";
import { FreelanceContractResultDTO } from "../../dtos/freelanceContract";

export type UploadExecutionDTO = z.infer<typeof UploadExecutionDTOValidation>;

export type UploadExecutionResultDTO = UploadExecutionDTO & {
    freelance_contract?: FreelanceContractResultDTO | null;
    cost_type?: null; // TODO
};

export type UpdateExecutionDTO = z.infer<typeof UpdateExecutionDTOValidation>;

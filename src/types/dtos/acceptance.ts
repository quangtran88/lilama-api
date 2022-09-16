import { z } from "zod";
import { UpdateAcceptanceDTOValidation, UploadAcceptanceDTOValidation } from "../../validations/acceptance";
import { FreelanceContractResultDTO } from "../../dtos/freelanceContract";

export type UploadAcceptanceDTO = z.infer<typeof UploadAcceptanceDTOValidation>;

export type UploadAcceptanceResultDTO = UploadAcceptanceDTO & {
    freelance_contract?: FreelanceContractResultDTO | null;
};

export type UpdateAcceptanceDTO = z.infer<typeof UpdateAcceptanceDTOValidation>;

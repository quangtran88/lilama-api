import { z } from "zod";
import { UpdateBudgetDTOValidation, UploadBudgetDTOValidation } from "../../validations/budget";
import { FreelanceContractResultDTO } from "../../dtos/freelanceContract";

export type UploadBudgetDTO = z.infer<typeof UploadBudgetDTOValidation>;

export type UploadBudgetResultDTO = UploadBudgetDTO & {
    freelance_contract?: FreelanceContractResultDTO | null;
    cost_type?: null; // TODO
};

export type UpdateBudgetDTO = z.infer<typeof UpdateBudgetDTOValidation>;

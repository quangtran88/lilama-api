import { z } from "zod";
import { UpdateFinanceDTOValidation, UploadFinanceDTOValidation } from "../../validations/finance";
import { MainContractResultDTO } from "../../dtos/mainContract";

export type UploadFinanceDTO = z.infer<typeof UploadFinanceDTOValidation>;

export type UploadFinanceResultDTO = z.infer<typeof UploadFinanceDTOValidation> & {
    main_contract?: MainContractResultDTO | null;
};

export type UpdateFinanceDTO = z.infer<typeof UpdateFinanceDTOValidation>;

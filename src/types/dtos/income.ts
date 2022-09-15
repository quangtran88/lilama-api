import { z } from "zod";
import { UpdateIncomeDTOValidation, UploadIncomeDTOValidation } from "../../validations/income";
import { MainContractResultDTO } from "../../dtos/mainContract";

export type UploadIncomeDTO = z.infer<typeof UploadIncomeDTOValidation>;

export type UploadIncomeResultDTO = UploadIncomeDTO & {
    main_contract?: MainContractResultDTO | null;
};

export type UpdateIncomeDTO = z.infer<typeof UpdateIncomeDTOValidation>;

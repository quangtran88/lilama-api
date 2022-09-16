import { z } from "zod";
import {
    UpdateFreelanceContractDTOValidation,
    UploadFreelanceContractDTOValidation,
} from "../../validations/freelanceContract";
import { ExecutorResultDTO } from "../../dtos/executor";
import { ManagerResultDTO } from "../../dtos/manager";
import { MainContractResultDTO } from "../../dtos/mainContract";

export type UploadFreelanceContractDTO = z.infer<typeof UploadFreelanceContractDTOValidation>;

export type UploadFreelanceContractResultDTO = UploadFreelanceContractDTO & {
    executor?: ExecutorResultDTO | null;
    manager?: ManagerResultDTO | null;
    main_contract?: MainContractResultDTO | null;
};

export type UpdateFreelanceContractDTO = z.infer<typeof UpdateFreelanceContractDTOValidation>;

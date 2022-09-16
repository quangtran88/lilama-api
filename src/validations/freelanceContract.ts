import { z } from "zod";
import { IdDTOValidation } from "./base";
import { zodDate } from "../utils/validation";

export const UploadFreelanceContractDTOValidation = z.object({
    code: z.string(),
    main_contract_code: z.string(),
    manager_code: z.string(),
    executor_code: z.string(),
    distributed_value: z.number().optional(),
    description: z.string().optional(),
    execution_description: z.string().optional(),
    signed_at: zodDate(),
    status: z.enum(["Đang thực hiện", "Hoàn thành", "Đã quyết toán"]),
    gnv_code: z.string().optional(),
    gnv_date: zodDate(),
});

export const UpdateFreelanceContractDTOValidation = IdDTOValidation.extend({
    main_contract_code: z.string().optional(),
    manager_code: z.string().optional(),
    executor_code: z.string().optional(),
    distributed_value: z.number().optional(),
    description: z.string().optional(),
    execution_description: z.string().optional(),
    signed_at: zodDate(),
    status: z.enum(["Đang thực hiện", "Hoàn thành", "Đã quyết toán"]),
    gnv_code: z.string().optional(),
    gnv_date: zodDate(),
});

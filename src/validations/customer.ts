import { z } from "zod";
import { IdDTOValidation } from "./base";

export const UploadCustomerDTOValidation = z.object({
    code: z.string(),
    company: z.string().optional(),
    address: z.string().optional(),
    tax_code: z.string().optional(),
});

export const UpdateCustomerDTOValidation = IdDTOValidation.extend({
    company: z.string().optional(),
    address: z.string().optional(),
    tax_code: z.string().optional(),
});

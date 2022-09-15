import { z } from "zod";
import { IdDTOValidation } from "./base";
import moment from "moment";

export const UploadMainContractDTOValidation = z.object({
    code: z.string(),
    binding_package_code: z.string(),
    project_code: z.string(),
    customer_code: z.string(),
    value: z.number().optional(),
    description: z.string().optional(),
    signed_at: z
        .preprocess((date) => {
            if (typeof date == "string") {
                if (date.includes("/")) return moment(date, "DD/MM/YYYY").utcOffset(-7).toDate();
                else return moment(date).toDate();
            }
        }, z.date())
        .optional(),
});

export const UpdateMainContractDTOValidation = IdDTOValidation.extend({
    project_code: z.string(),
    binding_package_code: z.string().optional(),
    customer_code: z.string().optional(),
    value: z.number().optional(),
    description: z.string().optional(),
    signed_at: z.string().optional(),
});

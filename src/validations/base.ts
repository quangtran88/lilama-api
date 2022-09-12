import { z } from "zod";
import { isOID } from "../utils/validation";

export const IdDTOValidation = z.object({
    id: z.string().refine((s) => isOID(s)),
});

export const PaginateDTOValidation = z.object({
    page: z.string().regex(/^\d+$/, "Invalid page").optional(),
    limit: z.string().regex(/^\d+$/, "Invalid limit").optional(),
});

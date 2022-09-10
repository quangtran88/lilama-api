import { z } from "zod";
import { isOID } from "../utils/validation";

export const IdDTOValidation = z.object({
    id: z.string().refine(isOID),
});

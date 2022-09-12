import { z } from "zod";
import { GetConfigDTOValidation, SetConfigDTOValidation } from "../../validations/config";

export type GetConfigDTO = z.infer<typeof GetConfigDTOValidation>;

export type SetConfigDTO = z.infer<typeof SetConfigDTOValidation>;

import { z } from "zod";
import { CreateProjectDTOValidation } from "../../validations/project";

export type CreateProjectDTO = z.infer<typeof CreateProjectDTOValidation>;

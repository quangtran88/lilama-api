import { z } from "zod";
import { CreateProjectDTOValidation, UpdateProjectDTOValidation } from "../../validations/project";

export type CreateProjectDTO = z.infer<typeof CreateProjectDTOValidation>;

export type UpdateProjectDTO = z.infer<typeof UpdateProjectDTOValidation>;

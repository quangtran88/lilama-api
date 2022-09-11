import { z } from "zod";
import {
    CreateProjectDTOValidation,
    UpdateProjectDTOValidation,
    UploadProjectDTOValidation,
} from "../../validations/project";

export type CreateProjectDTO = z.infer<typeof CreateProjectDTOValidation>;

export type UpdateProjectDTO = z.infer<typeof UpdateProjectDTOValidation>;

export type UploadProjectDTO = z.infer<typeof UploadProjectDTOValidation>;

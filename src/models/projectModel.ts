import { model } from "mongoose";
import {
    IProject,
    IProjectDocument,
    IProjectModel,
    IProjectUpload,
    IProjectUploadDocument,
    IProjectUploadModel,
} from "../types/models/IProject";
import paginate from "mongoose-paginate-v2";
import { generateSchema, generateUploadSchema } from "../utils/mongo";

const ProjectSchema = generateSchema<IProject>({
    code: { type: String, unique: true },
    description: String,
    need_review: Boolean,
});

const ProjectUploadSchema = generateUploadSchema<IProjectUpload>({
    code: String,
    description: String,
});

ProjectSchema.plugin(paginate);

export const ProjectModel = model<IProjectDocument, IProjectModel>("Project", ProjectSchema);
export const ProjectUploadModel = model<IProjectUploadDocument, IProjectUploadModel>(
    "ProjectUpload",
    ProjectUploadSchema,
    "project_uploads"
);

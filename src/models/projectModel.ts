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
    code: String,
    description: String,
    need_review: Boolean,
});

ProjectSchema.plugin(paginate);

ProjectSchema.index({ code: 1 }, { unique: true });

export const ProjectModel = model<IProjectDocument, IProjectModel>("Project", ProjectSchema);

const ProjectUploadSchema = generateUploadSchema<IProjectUpload>({
    code: String,
    description: String,
});

export const ProjectUploadModel = model<IProjectUploadDocument, IProjectUploadModel>(
    "ProjectUpload",
    ProjectUploadSchema,
    "project_uploads"
);

import { model } from "mongoose";
import { IProject, IProjectModel } from "../types/models/IProject";
import paginate from "mongoose-paginate-v2";
import { generateSchema } from "../utils/mongo";

const ProjectSchema = generateSchema<IProject>({
    code: { type: String, unique: true },
    description: String,
});

ProjectSchema.plugin(paginate);

export const ProjectModel = model<IProject, IProjectModel>("Project", ProjectSchema);

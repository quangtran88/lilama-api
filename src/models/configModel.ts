import { generateSchema } from "../utils/mongo";
import { IConfig, IConfigDocument, IConfigModel } from "../types/models/IConfig";
import { model } from "mongoose";

const ConfigSchema = generateSchema<IConfig>({
    key: String,
    value: String,
});

ConfigSchema.index({ key: 1 });

export const ConfigModel = model<IConfigDocument, IConfigModel>("Config", ConfigSchema);

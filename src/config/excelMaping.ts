import { IProject } from "../types/models/IProject";

export type ExcelMapping<Schema> = {
    [key in keyof Partial<Schema>]: string;
};

export const IMPORT_PROJECT_KEY: ExcelMapping<IProject> = {
    code: "Tên dự án",
    description: "Thông tin dự án",
};

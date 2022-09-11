import multer from "multer";
import * as xlsx from "xlsx";
import { mapLine } from "./excelMapper";
import { ExcelMapping } from "../config/excelMaping";
import { validateZod } from "./validation";
import { UploadError, ValidationError } from "../errors/base";
import { Error } from "mongoose";
import { ZodType } from "zod";

const upload = multer({ dest: "/tmp" });

export function file() {
    return upload.single("file");
}

export function validateFile<T>(filePath: string, validation: ZodType<T>, importKeys: ExcelMapping<any>): T[] {
    const workbook = xlsx.readFile(filePath);
    const sheet_name_list = workbook.SheetNames;
    const json = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    const dtoList: any[] = [];
    for (let i = 0; i < json.length; i++) {
        const line = json[i];
        try {
            const data = mapLine(line, importKeys);
            const dto = validateZod(validation, data);
            dtoList.push(dto);
        } catch (error) {
            if (error instanceof ValidationError) {
                const errorMessage = `[${importKeys[error.fieldPath]}] ${error.issue}`;
                throw new UploadError(errorMessage, i + 1);
            }
            throw new UploadError((error as Error).message, i + 1);
        }
    }
    return dtoList;
}

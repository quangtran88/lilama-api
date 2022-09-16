import { IBase } from "../types/models/IBase";
import { z } from "zod";
import { IdDTOValidation } from "../validations/base";

export abstract class BaseResultDTO {
    id: string;
    created_at?: Date;
    created_by?: string;
    updated_at?: Date;
    updated_by?: string;

    protected constructor(base: IBase) {
        this.created_at = base.created_at;
        this.created_by = base.created_by;
        this.updated_at = base.updated_at;
        this.updated_by = base.updated_by;
        this.id = base._id?.toString();
    }
}

export type IdDTO = z.infer<typeof IdDTOValidation>;

import { BaseResultDTO } from "./base";
import { ICostType } from "../types/models/ICostType";

export class CostTypeResultDTO extends BaseResultDTO {
    code: string;
    name?: string;
    description?: string;

    constructor(executor: ICostType) {
        super(executor);
        this.code = executor.code;
        this.name = executor.name;
        this.description = executor.description;
    }
}

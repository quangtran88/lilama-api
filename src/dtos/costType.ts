import { BaseResultDTO } from "./base";
import { ICostType } from "../types/models/ICostType";

export class CostTypeResultDTO extends BaseResultDTO {
    code: string;
    name?: string;
    note?: string;

    constructor(costType: ICostType) {
        super(costType);
        this.code = costType.code;
        this.name = costType.name;
        this.note = costType.note;
    }
}

import { BaseResultDTO } from "./base";
import { IManager } from "../types/models/IManager";

export class ManagerResultDTO extends BaseResultDTO {
    code: string;
    info?: string;
    need_review?: boolean;

    constructor(executor: IManager) {
        super(executor);
        this.code = executor.code;
        this.info = executor.info;
        this.need_review = executor.need_review;
    }
}

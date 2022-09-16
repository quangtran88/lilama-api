import { BaseResultDTO } from "./base";
import { IExecutor } from "../types/models/IExecutor";

export class ExecutorResultDTO extends BaseResultDTO {
    code: string;
    info?: string;
    need_review?: boolean;

    constructor(executor: IExecutor) {
        super(executor);
        this.code = executor.code;
        this.info = executor.info;
        this.need_review = executor.need_review;
    }
}

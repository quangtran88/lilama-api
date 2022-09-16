import { BaseRepository } from "./baseRepository";
import { IExecutor, IExecutorModel, IExecutorUpload, IExecutorUploadModel } from "../types/models/IExecutor";
import { ExecutorModel, ExecutorUploadModel } from "../models/executor";

class ExecutorRepository extends BaseRepository<IExecutor, IExecutorModel, IExecutorUpload, IExecutorUploadModel> {
    constructor() {
        super(ExecutorModel, ExecutorUploadModel);
    }

    async findByCode(code: IExecutor["code"]) {
        return this.findFirst({ code });
    }
}

export default new ExecutorRepository();

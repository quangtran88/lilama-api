import { BaseRepository } from "./baseRepository";
import { IExecution, IExecutionModel, IExecutionUpload, IExecutionUploadModel } from "../types/models/IExecution";
import { ExecutionModel, ExecutionUploadModel } from "../models/execution";

class ExecutionRepository extends BaseRepository<IExecution, IExecutionModel, IExecutionUpload, IExecutionUploadModel> {
    constructor() {
        super(ExecutionModel, ExecutionUploadModel);
    }
}

export default new ExecutionRepository();

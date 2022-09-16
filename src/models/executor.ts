import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IExecutor,
    IExecutorDocument,
    IExecutorModel,
    IExecutorUpload,
    IExecutorUploadDocument,
    IExecutorUploadModel,
} from "../types/models/IExecutor";
import paginate from "mongoose-paginate-v2";
import { model } from "mongoose";

const ExecutorSchema = generateSchema<IExecutor>({
    code: String,
    info: String,
    need_review: Boolean,
});

ExecutorSchema.plugin(paginate);

ExecutorSchema.index({ code: 1 });

export const ExecutorModel = model<IExecutorDocument, IExecutorModel>("Executor", ExecutorSchema);

const ExecutorUploadSchema = generateUploadSchema<IExecutorUpload>({
    code: String,
    info: String,
});

ExecutorUploadSchema.plugin(paginate);

export const ExecutorUploadModel = model<IExecutorUploadDocument, IExecutorUploadModel>(
    "ExecutorUpload",
    ExecutorUploadSchema,
    "executor_uploads"
);

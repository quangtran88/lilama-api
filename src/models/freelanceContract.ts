import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IFreelanceContract,
    IFreelanceContractDocument,
    IFreelanceContractModel,
    IFreelanceContractUpload,
    IFreelanceContractUploadDocument,
    IFreelanceContractUploadModel,
} from "../types/models/IFreelanceContract";
import paginate from "mongoose-paginate-v2";
import { model, Types } from "mongoose";

const FreelanceContractSchema = generateSchema<IFreelanceContract>({
    code: String,
    description: String,
    signed_at: Date,
    need_review: Boolean,
    distributed_value: Number,
    execution_description: String,
    status: String,
    gnv_code: String,
    gnv_date: Date,
    main_contract: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    manager: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    executor: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
});

FreelanceContractSchema.plugin(paginate);

FreelanceContractSchema.index({ code: 1 }, { unique: true });
FreelanceContractSchema.index({ "main_contract.code": 1 });
FreelanceContractSchema.index({ "manager.code": 1 });
FreelanceContractSchema.index({ "executor.code": 1 });

export const FreelanceContractModel = model<IFreelanceContractDocument, IFreelanceContractModel>(
    "FreelanceContract",
    FreelanceContractSchema,
    "freelance_contracts"
);

const FreelanceContractUploadSchema = generateUploadSchema<IFreelanceContractUpload>({
    code: String,
    main_contract_code: String,
    executor_code: String,
    manager_code: String,
    description: String,
    signed_at: Date,
    distributed_value: Number,
    execution_description: String,
    status: String,
    gnv_code: String,
    gnv_date: Date,
});

FreelanceContractUploadSchema.plugin(paginate);

export const FreelanceContractUploadModel = model<IFreelanceContractUploadDocument, IFreelanceContractUploadModel>(
    "FreelanceContractUpload",
    FreelanceContractUploadSchema,
    "freelance_contract_uploads"
);

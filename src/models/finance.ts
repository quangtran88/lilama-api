import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    IFinance,
    IFinanceDocument,
    IFinanceModel,
    IFinanceUpload,
    IFinanceUploadDocument,
    IFinanceUploadModel,
} from "../types/models/IFinance";
import { model, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";

const FinanceSchema = generateSchema<IFinance>({
    main_contract: {
        _id: Types.ObjectId,
        code: String,
        need_review: Boolean,
    },
    mc_value: Number,
    contract_distributed_value: Number,
    contract_execution_value: Number,
    contract_retention_value: Number,
    contract_year: Number,
    contract_rate: Number,
    contract_final_value: Number,
    contract_net_profit: Number,
    settlement_distributed_value: Number,
    settlement_execution_value: Number,
    settlement_retention_value: Number,
    settlement_year: Number,
    settlement_rate: Number,
    settlement_final_value: Number,
    settlement_net_profit: Number,
});

FinanceSchema.plugin(paginate);

FinanceSchema.index({ "main_contract.code": 1 });

export const FinanceModel = model<IFinanceDocument, IFinanceModel>("Finance", FinanceSchema);

const FinanceUploadSchema = generateUploadSchema<IFinanceUpload>({
    main_contract_code: String,
    mc_value: Number,
    contract_distributed_value: Number,
    contract_execution_value: Number,
    contract_year: Number,
    contract_rate: Number,
    settlement_distributed_value: Number,
    settlement_execution_value: Number,
    settlement_year: Number,
    settlement_rate: Number,
});

FinanceUploadSchema.plugin(paginate);

export const FinanceUploadModel = model<IFinanceUploadDocument, IFinanceUploadModel>(
    "FinanceUpload",
    FinanceUploadSchema,
    "finance_uploads"
);

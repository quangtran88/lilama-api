import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel, Types } from "mongoose";

export const enum IFreelanceContractStatus {
    IN_PROGRESS = "Đang thực hiện",
    END = "Hoàn thành",
    SETTLED = "Đã quyết toán",
}

export interface IFreelanceContract extends IBase<IFreelanceContract> {
    code: string;
    description?: string;
    signed_at?: Date;
    need_review?: boolean;
    distributed_value?: number;
    execution_description?: string;
    status?: string;
    gnv_code?: string;
    gnv_date?: Date;
    main_contract: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    executor: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    manager: {
        _id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
}
export interface IFreelanceContractDocument extends IFreelanceContract {}
export interface IFreelanceContractModel
    extends Model<IFreelanceContractDocument>,
        PaginateModel<IFreelanceContractDocument> {}

export interface IFreelanceContractUpload extends IBase {
    code: string;
    main_contract_code: string;
    manager_code: string;
    executor_code: string;
    distributed_value?: number;
    description?: string;
    execution_description?: string;
    signed_at?: Date;
    status: IFreelanceContractStatus;
    need_review?: boolean;
    gnv_code?: string;
    gnv_date?: Date;
}
export interface IFreelanceContractUploadDocument extends IUpload<IFreelanceContractUpload> {}
export interface IFreelanceContractUploadModel
    extends Model<IFreelanceContractUploadDocument>,
        PaginateModel<IFreelanceContractUploadDocument> {}

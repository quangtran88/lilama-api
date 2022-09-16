import { BaseResultDTO } from "./base";
import { Types } from "mongoose";
import { IFreelanceContract } from "../types/models/IFreelanceContract";
import { mapId } from "../utils/dto";

export class FreelanceContractResultDTO extends BaseResultDTO {
    code: string;
    distributed_value?: number;
    description?: string;
    execution_description?: string;
    signed_at?: Date;
    status?: string;
    need_review?: boolean;
    gnv_code?: string;
    gnv_date?: Date;
    main_contract: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    executor: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    manager: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };

    constructor(fc: IFreelanceContract) {
        super(fc);
        this.code = fc.code;
        this.distributed_value = fc.distributed_value;
        this.description = fc.description;
        this.execution_description = fc.execution_description;
        this.status = fc.status;
        this.signed_at = fc.signed_at;
        this.need_review = fc.need_review;
        this.gnv_code = fc.gnv_code;
        this.gnv_date = fc.gnv_date;
        this.main_contract = mapId(fc.main_contract);
        this.executor = mapId(fc.executor);
        this.manager = mapId(fc.manager);
    }
}

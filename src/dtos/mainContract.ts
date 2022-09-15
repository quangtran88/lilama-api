import { BaseResultDTO } from "./base";
import { IMainContract } from "../types/models/IMainContract";
import { mapId } from "../utils/dto";

export class MainContractResultDTO extends BaseResultDTO {
    code: string;
    value?: number;
    description?: string;
    signed_at?: Date;
    need_review?: boolean;
    binding_package: {
        id: string;
        code: string;
        need_review?: boolean;
    };
    customer: {
        id: string;
        code: string;
        need_review?: boolean;
    };
    project: {
        id: string;
        code: string;
        need_review?: boolean;
    };

    constructor(mc: IMainContract) {
        super(mc);
        this.code = mc.code;
        this.value = mc.value;
        this.description = mc.description;
        this.signed_at = mc.signed_at;
        this.need_review = mc.need_review;
        this.project = mapId(mc.project);
        this.binding_package = mapId(mc.binding_package);
        this.customer = mapId(mc.customer);
    }
}

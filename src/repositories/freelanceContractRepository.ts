import { BaseRepository } from "./baseRepository";
import {
    IFreelanceContract,
    IFreelanceContractModel,
    IFreelanceContractUpload,
    IFreelanceContractUploadModel,
} from "../types/models/IFreelanceContract";
import { FreelanceContractModel, FreelanceContractUploadModel } from "../models/freelanceContract";

class FreelanceContractRepository extends BaseRepository<
    IFreelanceContract,
    IFreelanceContractModel,
    IFreelanceContractUpload,
    IFreelanceContractUploadModel
> {
    constructor() {
        super(FreelanceContractModel, FreelanceContractUploadModel);
    }

    findByCode(code: string) {
        return this.findFirst({ code });
    }
}

export default new FreelanceContractRepository();

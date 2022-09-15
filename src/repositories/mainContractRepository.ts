import { BaseRepository } from "./baseRepository";
import {
    IMainContract,
    IMainContractModel,
    IMainContractUpload,
    IMainContractUploadModel,
} from "../types/models/IMainContract";
import { MainContractModel, MainContractUploadModel } from "../models/mainContract";

class MainContractRepository extends BaseRepository<
    IMainContract,
    IMainContractModel,
    IMainContractUpload,
    IMainContractUploadModel
> {
    constructor() {
        super(MainContractModel, MainContractUploadModel);
    }

    findByCode(code: string) {
        return this.findFirst({ code });
    }
}

export default new MainContractRepository();

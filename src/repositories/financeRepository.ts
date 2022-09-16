import { BaseRepository } from "./baseRepository";
import { IFinance, IFinanceModel, IFinanceUpload, IFinanceUploadModel } from "../types/models/IFinance";
import { FinanceModel, FinanceUploadModel } from "../models/finance";

class FinanceRepository extends BaseRepository<IFinance, IFinanceModel, IFinanceUpload, IFinanceUploadModel> {
    constructor() {
        super(FinanceModel, FinanceUploadModel);
    }
}

export default new FinanceRepository();

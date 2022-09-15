import { BaseRepository } from "./baseRepository";
import { IIncome, IIncomeModel, IIncomeUpload, IIncomeUploadModel } from "../types/models/IIncome";
import { IncomeModel, IncomeUploadModel } from "../models/income";

class IncomeRepository extends BaseRepository<IIncome, IIncomeModel, IIncomeUpload, IIncomeUploadModel> {
    constructor() {
        super(IncomeModel, IncomeUploadModel);
    }
}

export default new IncomeRepository();

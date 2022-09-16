import { BaseRepository } from "./baseRepository";
import { IBudget, IBudgetModel, IBudgetUpload, IBudgetUploadModel } from "../types/models/IBudget";
import { BudgetModel, BudgetUploadModel } from "../models/budget";

class BudgetRepository extends BaseRepository<IBudget, IBudgetModel, IBudgetUpload, IBudgetUploadModel> {
    constructor() {
        super(BudgetModel, BudgetUploadModel);
    }
}

export default new BudgetRepository();

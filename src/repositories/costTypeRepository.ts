import { BaseRepository } from "./baseRepository";
import { ICostType, ICostTypeModel, ICostTypeUpload, ICostTypeUploadModel } from "../types/models/ICostType";
import { CostTypeModel, CostTypeUploadModel } from "../models/costType";

class CostTypeRepository extends BaseRepository<ICostType, ICostTypeModel, ICostTypeUpload, ICostTypeUploadModel> {
    constructor() {
        super(CostTypeModel, CostTypeUploadModel);
    }

    findByCode(code: string) {
        return this.findFirst({ code });
    }
}

export default new CostTypeRepository();

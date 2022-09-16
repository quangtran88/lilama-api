import { BaseRepository } from "./baseRepository";
import { IAcceptance, IAcceptanceModel, IAcceptanceUpload, IAcceptanceUploadModel } from "../types/models/IAcceptance";
import { AcceptanceModel, AcceptanceUploadModel } from "../models/acceptance";

class AcceptanceRepository extends BaseRepository<
    IAcceptance,
    IAcceptanceModel,
    IAcceptanceUpload,
    IAcceptanceUploadModel
> {
    constructor() {
        super(AcceptanceModel, AcceptanceUploadModel);
    }
}

export default new AcceptanceRepository();

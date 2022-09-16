import { BaseRepository } from "./baseRepository";
import { IManager, IManagerModel, IManagerUpload, IManagerUploadModel } from "../types/models/IManager";
import { ManagerModel, ManagerUploadModel } from "../models/manager";

class ManagerRepository extends BaseRepository<IManager, IManagerModel, IManagerUpload, IManagerUploadModel> {
    constructor() {
        super(ManagerModel, ManagerUploadModel);
    }

    async findByCode(code: IManager["code"]) {
        return this.findFirst({ code });
    }
}

export default new ManagerRepository();

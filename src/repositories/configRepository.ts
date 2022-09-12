import { BaseRepository } from "./baseRepository";
import { IConfig, IConfigModel } from "../types/models/IConfig";
import { ConfigModel } from "../models/configModel";

class ConfigRepository extends BaseRepository<IConfig, IConfigModel> {
    constructor() {
        super(ConfigModel);
    }

    findByKey(key: string) {
        return this.findFirst({ key });
    }
}

export default new ConfigRepository();

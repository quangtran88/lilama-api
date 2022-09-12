import { BaseResultDTO } from "./base";
import { IConfig } from "../types/models/IConfig";

export class ConfigResultDTO extends BaseResultDTO {
    key: string;
    value: string;

    constructor(config: IConfig) {
        super(config);
        this.key = config.key;
        this.value = config.value;
    }
}

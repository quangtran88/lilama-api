import configRepository from "../repositories/configRepository";

export enum CONFIG_KEY {
    IMPORT_PROJECT_SAMPLE_FILE = "IMPORT_PROJECT_SAMPLE_FILE",
}

class ConfigService {
    async get(key: string): Promise<string> {
        const config = await configRepository.findByKey(key);
        if (!config) return "";
        return config.value;
    }

    async getAll() {
        return configRepository.find();
    }

    async set(key: string, value: string) {
        const existed = await configRepository.findByKey(key);
        if (!existed) {
            return configRepository.insert({ key, value });
        }
        return configRepository.updateById(existed._id, { value });
    }
}

export default new ConfigService();
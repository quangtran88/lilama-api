import configRepository from "../repositories/configRepository";

export enum CONFIG_KEY {
    IMPORT_PROJECT_SAMPLE_FILE = "IMPORT_PROJECT_SAMPLE_FILE",
    IMPORT_BINDING_PACKAGE_SAMPLE_FILE = "IMPORT_BINDING_PACKAGE_SAMPLE_FILE",
    IMPORT_CUSTOMER_SAMPLE_FILE = "IMPORT_CUSTOMER_SAMPLE_FILE",
    IMPORT_MAIN_CONTRACT_SAMPLE_FILE = "IMPORT_MAIN_CONTRACT_SAMPLE_FILE",
    IMPORT_INCOME_SAMPLE_FILE = "IMPORT_INCOME_SAMPLE_FILE",
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

    async set(key: string, value: string, updatedBy: string) {
        const existed = await configRepository.findByKey(key);
        if (!existed) {
            return configRepository.insert({ key, value }, updatedBy);
        }
        return configRepository.updateById(existed._id, { value }, updatedBy);
    }
}

export default new ConfigService();

import { BaseRepository } from "../repositories/baseRepository";
import { IBase } from "../types/models/IBase";
import { HTTPError, HTTPErrorTuple } from "../errors/base";

type ServiceError = {
    NOT_FOUND: HTTPErrorTuple;
};

export abstract class BaseService<Schema extends IBase> {
    private repo: BaseRepository<Schema, any>;
    private error: ServiceError;

    protected constructor(repo: BaseRepository<Schema, any>, error: ServiceError) {
        this.repo = repo;
        this.error = error;
    }

    async assertExisted(id: IBase["_id"] | string) {
        const existed = await this.repo.findById(id);
        if (!existed) {
            throw new HTTPError(this.error.NOT_FOUND);
        }
        return existed;
    }
}

import { BaseRepository } from "../repositories/baseRepository";
import { IBase, IReviewable } from "../types/models/IBase";
import { HTTPError, HTTPErrorTuple } from "../errors/base";
import { IdDTO } from "../dtos/base";

type ServiceError = {
    NOT_FOUND: HTTPErrorTuple;
};

export abstract class BaseService<Schema extends IBase & IReviewable, UploadDTO extends Partial<any> = any> {
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

    async disable({ id }: IdDTO, updatedBy: string) {
        await this.assertExisted(id);
        return this.repo.updateById(id, { need_review: true }, updatedBy);
    }
}

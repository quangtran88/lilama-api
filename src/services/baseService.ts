import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { IBase, IReviewable } from "../types/models/IBase";
import { HTTPError, HTTPErrorTuple } from "../errors/base";
import { IdDTO } from "../dtos/base";
import { IUser, ReadAllPermissions } from "../types/models/IUser";
import { PaginateResult } from "mongoose";
import { IDisableService, IGetDetailsService, IPaginateService } from "../types/interfaces/service";

type ServiceError = {
    NOT_FOUND: HTTPErrorTuple;
};

export abstract class BaseService<
    Schema extends IBase & IReviewable,
    UploadDTO extends Partial<any> = any,
    SearchDTO extends object = any
> implements IPaginateService<Schema>, IGetDetailsService<Schema>, IDisableService
{
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

    abstract mapSearchToQuery(search?: SearchDTO): _FilterQuery<Schema>;

    async getPage(currentUser: IUser, search?: SearchDTO, page = 1, limit = 20): Promise<PaginateResult<Schema>> {
        const query = this.mapSearchToQuery(search);
        if (ReadAllPermissions.includes(currentUser.permission)) {
            return this.repo.findPage(query, page, limit);
        }
        return this.repo.findContributedPage(currentUser.username, query, page, limit);
    }

    async getDetails(id: string, currentUser: IUser) {
        let project: Schema | null;
        if (ReadAllPermissions.includes(currentUser.permission)) {
            project = await this.repo.findById(id);
        } else {
            project = await this.repo.findByIdContributed(currentUser.username, id);
        }
        return project;
    }
}

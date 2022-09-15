import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { IBase, IReviewable } from "../types/models/IBase";
import { HTTPError, HTTPErrorTuple } from "../errors/base";
import { IdDTO } from "../dtos/base";
import { IUser, ReadAllPermissions } from "../types/models/IUser";
import { AnyKeys, ClientSession, PaginateResult } from "mongoose";
import { IDisableService, IGetDetailsService, IPaginateService, IUpdateService } from "../types/interfaces/service";

type ServiceError = {
    NOT_FOUND: HTTPErrorTuple;
};

export abstract class BaseService<
    Schema extends IBase & IReviewable,
    SearchDTO extends object = any,
    UpdateDTO extends IdDTO = any,
    CreateDTO = Partial<Schema>
> implements IPaginateService<Schema>, IGetDetailsService<Schema>, IDisableService, IUpdateService<UpdateDTO>
{
    private repo: BaseRepository<Schema, any>;
    private error: ServiceError;
    protected dependencyRepo: BaseRepository<any, any>[] = [];
    protected dependencyField: string = "";

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
        await Promise.all(
            this.dependencyRepo.map((repo) =>
                repo.updateMany(
                    { [`${this.dependencyField}._id`]: id },
                    { [`${this.dependencyField}.need_review`]: true },
                    updatedBy
                )
            )
        );
        return this.repo.updateById(id, { need_review: true }, updatedBy);
    }

    abstract _mapSearchToQuery(search?: SearchDTO): _FilterQuery<Schema>;

    async getPage(currentUser: IUser, search?: SearchDTO, page = 1, limit = 20): Promise<PaginateResult<Schema>> {
        const query = this._mapSearchToQuery(search);
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

    abstract _beforeCreate(dto: CreateDTO, createdBy: string): Promise<Partial<Schema>>;

    async create(dto: CreateDTO, createdBy: string, session?: ClientSession) {
        const createData = await this._beforeCreate(dto, createdBy);
        return this.repo.insert(createData, createdBy, session);
    }

    abstract _beforeUpdate(dto: UpdateDTO, updatedBy: string, existed: Schema): Promise<AnyKeys<Schema>>;

    abstract _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: Schema,
        dto: UpdateDTO,
        updatedBy: string
    ): Promise<void>;

    async update(dto: UpdateDTO, updatedBy: string) {
        const existed = await this.assertExisted(dto.id);
        const updateData = await this._beforeUpdate(dto, updatedBy, existed);
        if (this.dependencyRepo.length) {
            this.dependencyRepo.forEach((repo) => this._updateDependencyData(repo, existed, dto, updatedBy));
        }
        return this.repo.updateById(dto.id, updateData, updatedBy);
    }
}

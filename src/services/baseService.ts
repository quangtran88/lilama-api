import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { IBase, IReviewable } from "../types/models/IBase";
import { HTTPError, HTTPErrorTuple } from "../errors/base";
import { IdDTO } from "../dtos/base";
import { IUser, ReadAllPermissions } from "../types/models/IUser";
import { AnyKeys, ClientSession, PaginateResult } from "mongoose";
import {
    ICreateService,
    IDisableService,
    IGetDetailsService,
    IPaginateService,
    IUpdateService,
} from "../types/interfaces/service";
import { SYSTEM, TEMP_CODE } from "../config/common";
import { CommonError } from "../errors/commonErrors";

type ServiceError = {
    NOT_FOUND: HTTPErrorTuple;
};

export abstract class BaseService<
    Schema extends IBase & IReviewable,
    SearchDTO extends object = any,
    UpdateDTO extends IdDTO = any,
    CreateDTO = Partial<Schema>
> implements
        IPaginateService<Schema>,
        IGetDetailsService<Schema>,
        IDisableService,
        IUpdateService<UpdateDTO>,
        ICreateService<Schema, CreateDTO>
{
    private repo: BaseRepository<Schema, any>;
    private error: ServiceError;

    protected dependencyRepo: BaseRepository<any, any>[] = [];
    protected dependencyField: string = "";
    protected tempQuery: _FilterQuery<Schema> = {};
    protected tempData: Partial<Schema> = {};

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

    abstract _beforeCreate(dto: CreateDTO, createdBy: string, session?: ClientSession): Promise<Partial<Schema>>;

    async create(dto: CreateDTO, createdBy: string, session?: ClientSession) {
        const createData = await this._beforeCreate(dto, createdBy, session);
        return this.repo.insert(createData, createdBy, session);
    }

    abstract _beforeUpdate(
        dto: UpdateDTO,
        updatedBy: string,
        existed: Schema,
        currentUser: IUser
    ): Promise<AnyKeys<Schema>>;

    abstract _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: Schema,
        dto: UpdateDTO,
        updatedBy: string
    ): Promise<void>;

    async update(dto: UpdateDTO, currentUser: IUser) {
        const updatedBy = currentUser.username;
        const existed = await this.assertExisted(dto.id);
        // @ts-ignore
        if (existed?.code == TEMP_CODE) {
            throw new HTTPError(CommonError.UPDATE_TEMP_DATA);
        }
        const updateData = await this._beforeUpdate(dto, updatedBy, existed, currentUser);
        if (this.dependencyRepo.length) {
            this.dependencyRepo.forEach((repo) => this._updateDependencyData(repo, existed, dto, updatedBy));
        }
        return this.repo.updateById(dto.id, updateData, updatedBy);
    }

    async getTemp(customData?: object): Promise<Schema> {
        const temp = await this.repo.findFirst(this.tempQuery);
        if (!temp) {
            return this.repo.insert({ ...this.tempData, ...customData, need_review: true }, SYSTEM);
        }
        return temp;
    }
}

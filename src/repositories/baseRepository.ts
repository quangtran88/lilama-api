import { IBase, IUpload } from "../types/models/IBase";
import {
    AnyKeys,
    ApplyBasicQueryCasting,
    ClientSession,
    Model,
    PaginateModel,
    QuerySelector,
    RootQuerySelector,
    Types,
} from "mongoose";
import { ILogUpload } from "../types/interfaces/service";

export type _FilterQuery<T> = {
    [P in keyof T]?: ApplyBasicQueryCasting<T> | QuerySelector<ApplyBasicQueryCasting<T[P]>>;
} & RootQuerySelector<T>;

export abstract class BaseRepository<
    Schema extends IBase,
    SchemaModel extends Model<Schema> & PaginateModel<Schema>,
    SchemaUpload extends IBase = any,
    SchemaUploadModel extends Model<IUpload<any>> = any
> implements ILogUpload
{
    private model: SchemaModel;
    private uploadModel?: SchemaUploadModel;

    protected constructor(model: SchemaModel, uploadModel?: SchemaUploadModel) {
        this.model = model;
        this.uploadModel = uploadModel;
    }

    async insert(data: Partial<Schema>, createdBy: string, session?: ClientSession): Promise<Schema> {
        const created = await this.model.create(
            [
                {
                    ...data,
                    contributors: [createdBy],
                    histories: { ...data, created_by: createdBy, contributors: [createdBy] },
                    created_by: createdBy,
                },
            ],
            { session }
        );
        return created[0];
    }

    insertMany(data: Partial<Schema>[], createdBy: string, session?: ClientSession) {
        const withHistories = data.map((data) => ({
            ...data,
            histories: { ...data, contributors: [createdBy], created_by: createdBy },
            contributors: [createdBy],
            created_by: createdBy,
        }));
        return this.model.create(withHistories, { session });
    }

    insertUpload(
        data: Partial<SchemaUpload>[],
        uploadedBy: string,
        insertedIds: Types.ObjectId[],
        session?: ClientSession
    ) {
        return this.uploadModel!.create([{ data, uploaded_by: uploadedBy, inserted_ids: insertedIds }], { session });
    }

    findById(id: IBase["_id"] | string) {
        return this.findFirst({ _id: id });
    }

    findByIdContributed(username: string, id: IBase["_id"] | string) {
        return this.findFirstContributed(username, { _id: id });
    }

    find(query?: _FilterQuery<Schema>) {
        return this.model.find({ ...query, deleted: { $exists: false } }).exec();
    }

    findPage(query?: _FilterQuery<Schema>, page = 1, limit = 20) {
        return this.model.paginate({ ...query, deleted: { $exists: false } }, { page, limit, lean: true });
    }

    findFirst(query?: _FilterQuery<Schema>) {
        return this.model.findOne({ ...query, deleted: { $exists: false } }).exec();
    }

    findFirstContributed(username: string, query?: _FilterQuery<Schema>) {
        return this.findFirst({ ...query, contributors: username });
    }

    findContributed(username: string, query?: _FilterQuery<Schema>) {
        return this.find({ ...query, contributors: username });
    }

    findContributedPage(username: string, query?: _FilterQuery<Schema>, page = 1, limit = 20) {
        return this.model.paginate(
            { ...query, contributors: username, deleted: { $exists: false } },
            { page, limit, lean: true }
        );
    }

    updateById(id: IBase["_id"] | string, data: AnyKeys<Schema>, updatedBy: string, session?: ClientSession) {
        return this.model
            .updateOne(
                { _id: id },
                {
                    $set: { ...data, updated_by: updatedBy },
                    $push: { histories: { ...data, updated_by: updatedBy } },
                    $addToSet: { contributors: updatedBy },
                },
                { session }
            )
            .exec();
    }

    addContributor(ids: (IBase["_id"] | string)[], contributor: string) {
        return this.model.updateMany({ _id: { $in: ids } }, { $addToSet: { contributors: contributor } }).exec();
    }

    deleteById(id: IBase["_id"] | string, deletedBy: string, session?: ClientSession) {
        return this.updateById(
            id,
            { deleted: true, deleted_at: new Date(), deleted_by: deletedBy },
            deletedBy,
            session
        );
    }
}

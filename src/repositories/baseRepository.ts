import { IBase } from "../types/models/IBase";
import { AnyKeys, Model, RootQuerySelector, QuerySelector, ApplyBasicQueryCasting } from "mongoose";

type _FilterQuery<T> = {
    [P in keyof T]?: ApplyBasicQueryCasting<T> | QuerySelector<ApplyBasicQueryCasting<T[P]>>;
} & RootQuerySelector<T>;

export abstract class BaseRepository<Schema extends IBase, SchemaModel extends Model<Schema>> {
    private model: SchemaModel;

    protected constructor(model: SchemaModel) {
        this.model = model;
    }

    create(data: AnyKeys<Schema>) {
        return this.model.create({ data });
    }

    findById(id: IBase["id"] | string) {
        return this.findFirst({ id });
    }

    find(query?: _FilterQuery<Schema>) {
        return this.model.find({ ...query, deleted: { $exists: false } }).exec();
    }

    findFirst(query?: _FilterQuery<Schema>) {
        return this.model.findOne({ ...query, deleted: { $exists: false } }).exec();
    }

    updateById(id: IBase["id"] | string, data: AnyKeys<Schema>) {
        return this.model.updateOne({ _id: id }, { $set: data }).exec();
    }

    deleteById(id: IBase["id"] | string, deletedBy: string) {
        return this.updateById(id, { deleted: true, deleted_at: new Date(), deleted_by: deletedBy });
    }
}

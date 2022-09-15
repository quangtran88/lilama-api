import { Types } from "mongoose";

interface HasId {
    _id: Types.ObjectId;
}

export function mapId<Schema>(model: Schema extends HasId ? Schema : never): any {
    const { _id, ...data } = model;
    return { id: _id.toString(), ...data };
}

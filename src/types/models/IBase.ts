import { Document, Types } from "mongoose";

export interface IBase<S = any> extends Document {
    _id: Types.ObjectId;
    contributors?: string[];
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted?: boolean;
    deleted_at?: Date;
    deleted_by?: string;
    histories?: S[];
}

export interface IUpload<S> {
    data: S[];
    inserted_ids: IBase["_id"][];
    uploaded_by: string;
    uploaded_at: Date;
}

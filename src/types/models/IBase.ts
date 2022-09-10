import { Document, Types } from "mongoose";

export interface IBase extends Document {
    _id: Types.ObjectId;
    id: Types.ObjectId;
    created_at: Date;
    created_by: string;
    updated_at: Date;
    updated_by: string;
    deleted?: boolean;
    deleted_at?: Date;
}

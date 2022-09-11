import mongoose, { Schema, SchemaDefinition, SchemaOptions } from "mongoose";
import { DB_URI } from "../config/db";
import { defaultTimestamp } from "../models/base";
import { IUpload } from "../types/models/IBase";

export const ObjectId = mongoose.Types.ObjectId;

export function getUri() {
    return DB_URI;
}

export async function initDB() {
    const uri = getUri();
    await mongoose.connect(uri);
    console.log("Mongoose connected.");
}

export function generateSchema<ISchema>(schemaDefinition: SchemaDefinition<ISchema>, options?: SchemaOptions) {
    return new Schema<ISchema>(
        {
            ...schemaDefinition,
            contributors: [String],
            deleted: Boolean,
            deleted_at: Date,
            deleted_by: String,
            created_by: String,
            updated_by: String,
        },
        { timestamps: defaultTimestamp, ...options }
    );
}

export function generateUploadSchema<ISchema>(schemaDefinition: SchemaDefinition<ISchema>, options?: SchemaOptions) {
    const schema = new Schema<ISchema>(schemaDefinition);
    return new Schema<IUpload<ISchema>>(
        {
            ...schemaDefinition,
            data: [schema],
            inserted_ids: [ObjectId],
            uploaded_by: String,
            uploaded_at: Date,
        },
        { timestamps: { createdAt: "uploaded_at", updatedAt: false }, ...options }
    );
}

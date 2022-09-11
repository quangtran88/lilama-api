import mongoose, { Schema, SchemaDefinition, SchemaOptions } from "mongoose";
import { DB_URI } from "../config/db";
import { defaultTimestamp } from "../models/base";

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

import mongoose from "mongoose";
import { DB_URI } from "../config/db";

export const ObjectId = mongoose.Types.ObjectId;

export async function initDB() {
    const uri = getUri();
    await mongoose.connect(uri);
    console.log("Mongoose connected.");
}

function getUri() {
    return DB_URI;
}

import { IUser } from "../types/models/IUser";
import { User } from "../models/user";
import { FilterQuery, Types } from "mongoose";

function create(user: Partial<IUser>) {
    return User.create(user);
}

function findByUsername(username: string) {
    return User.findOne({ username }).exec();
}

function findById(id: Types.ObjectId | string) {
    return User.findById(id).exec();
}

function find(query?: FilterQuery<IUser>) {
    return User.find(query || {}).exec();
}

export default {
    create,
    findByUsername,
    findById,
    find,
};

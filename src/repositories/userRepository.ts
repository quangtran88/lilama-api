import { IUser } from "../types/models/IUser";
import { User } from "../models/user";
import { FilterQuery, Types } from "mongoose";
import { IBase } from "../types/models/IBase";

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

function updateById(id: IBase["id"], data: Partial<IUser>) {
    return User.updateOne({ _id: id }, { $set: data }).exec();
}

export default {
    create,
    findByUsername,
    findById,
    find,
    updateById,
};

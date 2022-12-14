import { IBase } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export enum UserPermission {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
}

export const UserPermissions = [UserPermission.A, UserPermission.B, UserPermission.C, UserPermission.D];

export const ReadAllPermissions = [UserPermission.B, UserPermission.D];

export interface IUser extends IBase<IUser> {
    username: string;
    password: string;
    permission: UserPermission;
    active: boolean;
    phone?: string;
    full_name?: string;
    email?: string;
}

export interface IUserDocument extends IUser {}

export interface IUserModel extends Model<IUser>, PaginateModel<IUser> {}

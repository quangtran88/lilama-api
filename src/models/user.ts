import { model, Schema } from "mongoose";
import { defaultTimestamp } from "./base";
import { IUserDocument, IUserModel, UserPermissions } from "../types/models/IUser";
import paginate from "mongoose-paginate-v2";

const UserSchema = new Schema(
    {
        username: { type: String, require: true },
        password: { type: String, require: true },
        permission: {
            type: String,
            require: true,
            enum: UserPermissions,
        },
        full_name: String,
        email: String,
        phone: String,
    },
    {
        timestamps: defaultTimestamp,
    }
);

UserSchema.plugin(paginate);

export const User = model<IUserDocument, IUserModel>("User", UserSchema);

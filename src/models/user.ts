import { model, Schema } from "mongoose";
import { defaultTimestamp } from "./base";
import { IUser, IUserModel, UserPermissions } from "../types/models/IUser";
import paginate from "mongoose-paginate-v2";

const UserSchema = new Schema<IUser>(
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
        active: Boolean,
    },
    {
        timestamps: defaultTimestamp,
    }
);

UserSchema.plugin(paginate);

UserSchema.index({ username: 1 });
UserSchema.index({ active: 1 });

export const User = model<IUser, IUserModel>("User", UserSchema);

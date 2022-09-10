import { model } from "mongoose";
import { IUser, IUserModel, UserPermissions } from "../types/models/IUser";
import paginate from "mongoose-paginate-v2";
import { generateSchema } from "../utils/mongo";

const UserSchema = generateSchema<IUser>({
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
});

UserSchema.plugin(paginate);

UserSchema.index({ username: 1 });
UserSchema.index({ active: 1 });

export const UserModel = model<IUser, IUserModel>("User", UserSchema);

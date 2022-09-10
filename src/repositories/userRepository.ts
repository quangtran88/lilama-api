import { IUser, IUserModel } from "../types/models/IUser";
import { UserModel } from "../models/userModel";
import { BaseRepository } from "./baseRepository";

class UserRepository extends BaseRepository<IUser, IUserModel> {
    constructor() {
        super(UserModel);
    }

    findByUsername(username: string) {
        return this.findFirst({ username });
    }
}

export default new UserRepository();

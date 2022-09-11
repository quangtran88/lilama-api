import { IUser } from "../types/models/IUser";
import { BaseResultDTO } from "./base";

export class UserResultDTO extends BaseResultDTO {
    username: string;
    active: boolean;
    permission: string;
    full_name?: string;
    email?: string;
    phone?: string;

    constructor(user: IUser) {
        super(user);
        this.username = user.username;
        this.full_name = user.full_name;
        this.email = user.email;
        this.phone = user.phone;
        this.active = user.active;
        this.permission = user.permission;
    }
}

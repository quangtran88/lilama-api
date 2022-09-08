import { IUser } from "../types/models/IUser";
import { BaseResultDTO } from "./base";
import { z } from "zod";
import { CreateUserDTOValidation } from "../validations/user";

export class UserResultDTO extends BaseResultDTO {
    id: string;
    username: string;
    full_name?: string;
    email?: string;
    phone?: string;

    constructor(user: IUser) {
        super(user);
        this.id = user.id.toString();
        this.username = user.username;
        this.full_name = user.full_name;
        this.email = user.email;
        this.phone = user.phone;
    }
}

export type CreateUserDTO = z.infer<typeof CreateUserDTOValidation>;

import { IUser } from "../types/models/IUser";
import { hashPassword } from "../utils/hash";
import userRepository from "../repositories/userRepository";
import { CreateUserDTO } from "../dtos/user";
import { HTTPError } from "../errors/base";
import { UserError } from "../errors/userErrors";

async function createUser(dto: CreateUserDTO): Promise<IUser> {
    const existedUser = await userRepository.findByUsername(dto.username);
    if (existedUser) {
        throw new HTTPError(UserError.USERNAME_EXISTED);
    }

    const hashedPassword = await hashPassword(dto.password);
    return userRepository.create({ ...dto, password: hashedPassword, active: true });
}

async function getAllUsers(): Promise<IUser[]> {
    return userRepository.find();
}

export default {
    createUser,
    getAllUsers,
};

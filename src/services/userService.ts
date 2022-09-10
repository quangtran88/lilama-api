import { IUser } from "../types/models/IUser";
import { hashPassword } from "../utils/hash";
import userRepository from "../repositories/userRepository";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user";
import { HTTPError } from "../errors/base";
import { UserError } from "../errors/userErrors";
import { Types } from "mongoose";
import { IBase } from "../types/models/IBase";

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

async function assertUser(id: IBase["_id"] | string): Promise<IUser> {
    const userId = new Types.ObjectId(id);
    const existed = await userRepository.findById(userId);
    if (!existed) {
        throw new HTTPError(UserError.NOT_FOUND);
    }
    return existed;
}

async function updateUser(dto: UpdateUserDTO) {
    const { id, ...data } = dto;
    const user = await assertUser(id);
    if (dto.password) {
        data.password = await hashPassword(dto.password);
    }
    return userRepository.updateById(user.id, data);
}

export default {
    createUser,
    getAllUsers,
    updateUser,
};

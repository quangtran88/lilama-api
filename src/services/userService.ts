import { IUser } from "../types/models/IUser";
import { hashPassword } from "../utils/hash";
import userRepository from "../repositories/userRepository";
import { HTTPError } from "../errors/base";
import { UserError } from "../errors/userErrors";
import { IdDTO } from "../dtos/base";
import { CreateUserDTO, UpdateUserDTO } from "../types/dtos/user";
import { BaseService } from "./baseService";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { AnyKeys } from "mongoose";

class UserService extends BaseService<IUser, any, UpdateUserDTO, CreateUserDTO> {
    constructor() {
        super(userRepository, { NOT_FOUND: UserError.NOT_FOUND });
    }

    _mapSearchToQuery(search: any): _FilterQuery<IUser> {
        return {};
    }

    async _beforeCreate(dto: CreateUserDTO, createdBy: string): Promise<Partial<IUser>> {
        const existedUser = await userRepository.findByUsername(dto.username);
        if (existedUser) {
            throw new HTTPError(UserError.USERNAME_EXISTED);
        }
        const hashedPassword = await hashPassword(dto.password);
        return { ...dto, password: hashedPassword, active: true };
    }

    async _beforeUpdate(dto: UpdateUserDTO): Promise<AnyKeys<IUser>> {
        if (dto.password) {
            dto.password = await hashPassword(dto.password);
        }
        return dto;
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IUser,
        dto: UpdateUserDTO,
        updatedBy: string
    ) {
        return;
    }

    async getAll(): Promise<IUser[]> {
        return userRepository.find();
    }

    async block({ id }: IdDTO, updatedBy: string) {
        const user = await this.assertExisted(id);
        return userRepository.updateById(user.id, { active: false }, updatedBy);
    }
}

export default new UserService();

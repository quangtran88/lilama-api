import { IUser, UserPermission } from "../types/models/IUser";
import { comparePasswordHash, hashPassword } from "../utils/hash";
import userRepository from "../repositories/userRepository";
import { HTTPError } from "../errors/base";
import { UserError } from "../errors/userErrors";
import { IdDTO } from "../dtos/base";
import { ChangePasswordDTO, CreateUserDTO, UpdateUserDTO } from "../types/dtos/user";
import { BaseService } from "./baseService";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { AnyKeys } from "mongoose";
import { AuthError } from "../errors/authErrors";

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

    async _beforeUpdate(
        dto: UpdateUserDTO,
        updatedBy: string,
        existed: IUser,
        currentUser: IUser
    ): Promise<AnyKeys<IUser>> {
        if (currentUser.permission != UserPermission.D && existed.id != currentUser.id) {
            throw new HTTPError(AuthError.NO_PERMISSION);
        }
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

    async changePassword(dto: ChangePasswordDTO) {
        const user = await this.assertExisted(dto.id);
        const isValidPassword = await comparePasswordHash(dto.old_password, user.password);
        if (!isValidPassword) {
            throw new HTTPError(UserError.PASSWORD_NOT_MATCH);
        }
        const password = await hashPassword(dto.new_password);
        await this.update({ id: user._id.toString(), password }, user);
    }
}

export default new UserService();

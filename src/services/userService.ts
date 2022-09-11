import { IUser } from "../types/models/IUser";
import { hashPassword } from "../utils/hash";
import userRepository from "../repositories/userRepository";
import { HTTPError } from "../errors/base";
import { UserError } from "../errors/userErrors";
import { IdDTO } from "../dtos/base";
import { CreateUserDTO, UpdateUserDTO } from "../types/dtos/user";
import { BaseService } from "./baseService";

class UserService extends BaseService<IUser> {
    constructor() {
        super(userRepository, { NOT_FOUND: UserError.NOT_FOUND });
    }

    async create(dto: CreateUserDTO, createdBy: string): Promise<IUser> {
        const existedUser = await userRepository.findByUsername(dto.username);
        if (existedUser) {
            throw new HTTPError(UserError.USERNAME_EXISTED);
        }

        const hashedPassword = await hashPassword(dto.password);
        return userRepository.insert({ ...dto, password: hashedPassword, active: true, created_by: createdBy });
    }

    async getAll(): Promise<IUser[]> {
        return userRepository.find();
    }

    async update(dto: UpdateUserDTO, updatedBy: string) {
        const { id, ...data } = dto;
        const user = await this.assertExisted(id);
        if (dto.password) {
            data.password = await hashPassword(dto.password);
        }
        return userRepository.updateById(user.id, { ...data, updated_by: updatedBy });
    }

    async block({ id }: IdDTO, updatedBy: string) {
        const user = await this.assertExisted(id);
        return userRepository.updateById(user.id, { active: false, updated_by: updatedBy });
    }

    async getDetails({ id }: IdDTO): Promise<IUser> {
        return this.assertExisted(id);
    }
}

export default new UserService();

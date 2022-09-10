import { LoginDTO } from "../dtos/auth";
import userRepository from "../repositories/userRepository";
import { comparePasswordHash } from "../utils/hash";
import { AuthError } from "../errors/authErrors";
import { HTTPError } from "../errors/base";
import { IUser } from "../types/models/IUser";
import { UserError } from "../errors/userErrors";

async function verifyCredential(dto: LoginDTO): Promise<IUser> {
    const user = await userRepository.findByUsername(dto.username);
    if (!user) {
        throw new HTTPError(AuthError.INVALID_AUTHENTICATION);
    }
    if (!user.active) {
        throw new HTTPError(UserError.BLOCKED);
    }
    const isValidPassword = await comparePasswordHash(dto.password, user.password);
    if (!isValidPassword) {
        throw new HTTPError(AuthError.INVALID_AUTHENTICATION);
    }
    return user;
}

export default {
    verifyCredential,
};

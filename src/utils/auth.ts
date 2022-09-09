import { Response, NextFunction } from "express";
import { responseError } from "./response";
import { AuthError } from "../errors/authErrors";
import { SESSION_AUTH_KEY } from "../config/common";
import userRepository from "../repositories/userRepository";
import { UserError } from "../errors/userErrors";
import { Request } from "express";

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const userId = req.session[SESSION_AUTH_KEY];
    if (!userId) {
        return responseError(AuthError.NOT_AUTHENTICATED, res);
    }

    const user = await userRepository.findById(userId);
    if (!user) {
        return responseError(UserError.NOT_FOUND, res);
    }

    if (!user.active) {
        return responseError(UserError.BLOCKED, res);
    }

    req.currentUser = user;
    next();
}

import { NextFunction, Request, Response } from "express";
import { responseError } from "./response";
import { AuthError } from "../errors/authErrors";
import { AUTH_HEADER, JWT_SECRET } from "../config/common";
import userRepository from "../repositories/userRepository";
import { UserError } from "../errors/userErrors";
import { IUser, UserPermission } from "../types/models/IUser";
import jwt from "jsonwebtoken";

function verifyJwt(token): IUser["_id"] | false {
    try {
        const payload: any = jwt.verify(token, JWT_SECRET);
        return payload.id;
    } catch (error) {
        return false;
    }
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const token = req.header(AUTH_HEADER);
    if (!token) {
        return responseError(AuthError.NOT_AUTHENTICATED, res);
    }

    const userId = verifyJwt(token);
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

export function forbid(forbiddenPermissions: (keyof typeof UserPermission)[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.currentUser;
        if (!user || forbiddenPermissions.includes(user.permission)) {
            return responseError(AuthError.NO_PERMISSION, res);
        }

        next();
    };
}

export function allow(allowedPermissions: (keyof typeof UserPermission)[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const user = req.currentUser;
        if (!user || !allowedPermissions.includes(user.permission)) {
            return responseError(AuthError.NO_PERMISSION, res);
        }

        next();
    };
}

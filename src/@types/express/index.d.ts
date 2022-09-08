import { IUser } from "../../types/models/IUser";

declare module "express" {
    interface Request {
        currentUser?: IUser;
    }
}

declare module "express-session" {
    interface SessionData {
        userId?: string;
    }
}

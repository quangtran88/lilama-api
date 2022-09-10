import { Router, Request, Response, NextFunction } from "express";
import { handleError } from "./response";

type RouterHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export class CustomRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
    }

    getRouter() {
        return this.router;
    }

    private handle(
        method: "all" | "get" | "post" | "put" | "delete" | "patch" | "options" | "head",
        path: string,
        handlers: RouterHandler[]
    ) {
        const handler = handlers.pop();
        return this.router[method](path, ...handlers, (req, res, next) => {
            return handleError(res, async () => {
                const result = await handler!(req, res, next);
                return res.json(result);
            });
        });
    }

    get(path: string, ...handlers: RouterHandler[]) {
        return this.handle("get", path, handlers);
    }

    post(path: string, ...handlers: RouterHandler[]) {
        return this.handle("post", path, handlers);
    }

    patch(path: string, ...handlers: RouterHandler[]) {
        return this.handle("patch", path, handlers);
    }

    put(path: string, ...handlers: RouterHandler[]) {
        return this.handle("put", path, handlers);
    }
}

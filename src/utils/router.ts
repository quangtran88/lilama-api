import { Router, Request, Response } from "express";
import { handleError } from "./response";

type RouterHandler = (req: Request, res: Response) => Promise<any>;

export class CustomRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
    }

    getRouter() {
        return this.router;
    }

    get(path: string, handler: RouterHandler) {
        return this.router.get(path, (req, res) => {
            return handleError(res, async () => {
                const result = await handler(req, res);
                return res.json(result);
            });
        });
    }

    post(path: string, handler: RouterHandler) {
        return this.router.post(path, (req, res) => {
            return handleError(res, async () => {
                const result = await handler(req, res);
                return res.json(result);
            });
        });
    }

    patch(path: string, handler: RouterHandler) {
        return this.router.patch(path, (req, res) => {
            return handleError(res, async () => {
                const result = await handler(req, res);
                return res.json(result);
            });
        });
    }

    put(path: string, handler: RouterHandler) {
        return this.router.put(path, (req, res) => {
            return handleError(res, async () => {
                const result = await handler(req, res);
                return res.json(result);
            });
        });
    }
}

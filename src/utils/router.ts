import { NextFunction, Request, Response, Router } from "express";
import { data, handleError, paginate, success } from "./response";
import { UserPermission } from "../types/models/IUser";
import { z, ZodType } from "zod";
import { ExcelMapping } from "../config/excelMaping";
import { allow } from "./auth";
import { validatePaginate, validateZod } from "./validation";
import { file, validateFile } from "./upload";
import {
    ICreateService,
    IDisableService,
    IGetDetailsService,
    IPaginateService,
    IUpdateService,
    IUploadService,
} from "../types/interfaces/service";
import { BaseResultDTO } from "../dtos/base";
import { IdDTOValidation } from "../validations/base";

type RouterHandler = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;

export class CustomRouter {
    private readonly router: Router;

    constructor() {
        this.router = Router();
    }

    getRouter() {
        return this.router;
    }

    GET(path: string, ...handlers: RouterHandler[]) {
        return this.handle("get", path, handlers);
    }

    POST(path: string, ...handlers: RouterHandler[]) {
        return this.handle("post", path, handlers);
    }

    PATCH(path: string, ...handlers: RouterHandler[]) {
        return this.handle("patch", path, handlers);
    }

    PUT(path: string, ...handlers: RouterHandler[]) {
        return this.handle("put", path, handlers);
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
}

export function createPaginateRoute(
    router: CustomRouter,
    path: string,
    paginateService: IPaginateService,
    ResultDTO: { new (schema: any): BaseResultDTO },
    permissions: (keyof typeof UserPermission)[] = ["D", "C", "B"],
    searchValidation?: ZodType
) {
    router.GET(path, allow(permissions), async ({ currentUser, query }) => {
        const { page, limit } = validatePaginate(query);
        let dto;
        if (searchValidation) {
            dto = validateZod(searchValidation, query);
        }
        const paginateData = await paginateService.getPage(currentUser!, dto, page, limit);
        const data = paginateData.docs.map((p) => new ResultDTO(p));
        return paginate(data, paginateData);
    });
}

export function createGetDetailsRoute(
    router: CustomRouter,
    prefixPath: string,
    getDetailsService: IGetDetailsService,
    ResultDTO: { new (schema: any): BaseResultDTO },
    permissions: (keyof typeof UserPermission)[] = ["D", "C", "B"]
) {
    router.GET(`${prefixPath}/:id`, allow(permissions), async ({ currentUser, params }) => {
        const dto = validateZod(IdDTOValidation, { id: params.id });
        const details = await getDetailsService.getDetails(dto.id, currentUser!);
        return details && data(new ResultDTO(details));
    });
}

export function createUploadRoute(
    router: CustomRouter,
    prefixPath: string,
    uploadValidation: ZodType,
    importKeys: ExcelMapping,
    uploadService: IUploadService,
    permissions: (keyof typeof UserPermission)[] = ["D", "C"]
) {
    router.POST(`${prefixPath}/upload/verify`, allow(permissions), file(), async ({ file }) => {
        const dtoList = validateFile(file!.path, uploadValidation, importKeys);
        const result = await uploadService.verifyUpload(dtoList);
        return success(result);
    });
    router.POST(`${prefixPath}/upload/commit`, allow(permissions), async ({ body, currentUser }) => {
        const dto = validateZod(z.array(uploadValidation), body.data);
        const created = await uploadService.commitUpload(dto, currentUser!.username);
        return success({ createdIds: created.map((c) => c._id.toString()) });
    });
}

export function createUpdateRoute(
    router: CustomRouter,
    prefixPath: string,
    updateValidation: ZodType,
    updateService: IUpdateService
) {
    router.PATCH(`${prefixPath}/:id`, allow(["D"]), async (req) => {
        const dto = validateZod(updateValidation, { ...req.body, id: req.params.id });
        await updateService.update(dto, req.currentUser!.username);
        return success();
    });
}

export function createDisableRoute(router: CustomRouter, prefixPath: string, disableService: IDisableService) {
    router.POST(`${prefixPath}/:id/disable`, allow(["D"]), async ({ params, currentUser }) => {
        const dto = validateZod(IdDTOValidation, { id: params.id });
        await disableService.disable(dto, currentUser!.username);
        return success();
    });
}

export function createInsertRoute(
    router: CustomRouter,
    path: string,
    createService: ICreateService,
    createValidation: ZodType,
    permissions: (keyof typeof UserPermission)[] = ["D", "C"]
) {
    router.POST(path, allow(permissions), async (req) => {
        const dto = validateZod(createValidation, req.body);
        const { _id: createdId } = await createService.create(dto, req.currentUser!.username);
        return success({ createdId });
    });
}

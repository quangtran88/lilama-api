import { HTTPError, HTTPErrorTuple } from "../errors/base";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PaginateResult } from "mongoose";
import { IBase } from "../types/models/IBase";

export function responseError([statusCode, message]: HTTPErrorTuple, res: Response) {
    return res.status(statusCode).json({ error: message });
}

export function responseSuccess(res: Response, data?: object) {
    return res.json({ success: true, data });
}

export function success(data?: object) {
    return { success: true, data };
}

export function data(data: any) {
    return { data };
}

export function paginate(data: object, { page, limit, totalDocs }: PaginateResult<IBase>) {
    return { data, page, limit, total: totalDocs };
}

export async function handleError(res: Response, handler: () => Promise<any>) {
    try {
        await handler();
    } catch (error) {
        console.error(error);
        if (error instanceof HTTPError) {
            return responseError(error.tuple, res);
        }
        return responseError([StatusCodes.BAD_REQUEST, (error as Error).message], res);
    }
}

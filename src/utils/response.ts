import { HTTPError, HTTPErrorTuple } from "../errors/base";
import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function responseError([statusCode, message]: HTTPErrorTuple, res: Response) {
    return res.status(statusCode).json({ error: message });
}

export function responseSuccess(res: Response, data?: object) {
    return res.json({ success: true, data });
}

export async function handleError(res: Response, handler: () => Promise<any>) {
    try {
        await handler();
    } catch (error) {
        console.error(error);
        if (error instanceof HTTPError) {
            return responseError(error.tuple, res);
        }
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

import { IUser } from "../models/IUser";
import { PaginateResult, UpdateWriteOpResult } from "mongoose";
import { IdDTO } from "../../dtos/base";

export interface IUploadService<UploadDTO = any, Schema = any> {
    verifyUpload(dto: UploadDTO[]): Promise<UploadDTO[]>;
    commitUpload(dto: UploadDTO[], uploadedBy: string): Promise<Schema[]>;
}

export interface IPaginateService<Schema = any, SearchDTO = any> {
    getPage(currentUser: IUser, searchDTO?: SearchDTO, page?: number, limit?: number): Promise<PaginateResult<Schema>>;
}

export interface IGetDetailsService<ResultDTO = any> {
    getDetails(d: string, currentUser: IUser): Promise<ResultDTO | undefined | null>;
}

export interface IUpdateService<UpdateDTO = any> {
    update(dto: UpdateDTO, updatedBy: string): Promise<UpdateWriteOpResult>;
}

export interface IDisableService {
    disable({ id }: IdDTO, updatedBy: string): Promise<UpdateWriteOpResult>;
}

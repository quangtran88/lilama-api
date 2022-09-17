import { IUser } from "../models/IUser";
import { ClientSession, PaginateResult, Types, UpdateWriteOpResult } from "mongoose";
import { IdDTO } from "../../dtos/base";

export interface IUploadService<UploadDTO = any, Schema = any, UploadDTOResult = UploadDTO> {
    verifyUpload(dtoList: UploadDTO[]): Promise<UploadDTOResult[]>;
    commitUpload(dtoList: UploadDTOResult[], uploadedBy: string): Promise<Schema[]>;
}

export interface ILogUpload<SchemaUpload = any> {
    insertUpload(
        data: Partial<SchemaUpload>[],
        uploadedBy: string,
        insertedIds: Types.ObjectId[],
        session?: ClientSession
    ): Promise<SchemaUpload[]>;
}

export interface IPaginateService<Schema = any, SearchDTO = any> {
    getPage(currentUser: IUser, searchDTO?: SearchDTO, page?: number, limit?: number): Promise<PaginateResult<Schema>>;
}

export interface IGetDetailsService<ResultDTO = any> {
    getDetails(id: string, currentUser: IUser): Promise<ResultDTO | undefined | null>;
}

export interface IUpdateService<UpdateDTO = any> {
    update(dto: UpdateDTO, currentUser: IUser): Promise<UpdateWriteOpResult>;
}

export interface IDisableService {
    disable({ id }: IdDTO, updatedBy: string): Promise<UpdateWriteOpResult>;
}

export interface ICreateService<Schema = any, CreateDTO = any> {
    create(dto: CreateDTO, createdBy: string, session?: ClientSession): Promise<Schema>;
}

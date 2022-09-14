import { IBase, IUpload } from "./IBase";
import { Model, PaginateModel } from "mongoose";

export interface ICustomer extends IBase<ICustomer> {
    code: string;
    company?: string;
    address?: string;
    tax_code?: string;
    need_review?: boolean;
}
export interface ICustomerDocument extends ICustomer {}
export interface ICustomerModel extends Model<ICustomer>, PaginateModel<ICustomer> {}

export interface ICustomerUpload extends ICustomer {}
export interface ICustomerUploadDocument extends IUpload<ICustomerUpload> {}
export interface ICustomerUploadModel extends Model<ICustomerUploadDocument>, PaginateModel<ICustomerUploadDocument> {}

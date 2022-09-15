import { BaseService } from "./baseService";
import { ICustomer } from "../types/models/ICustomer";
import { UpdateCustomerDTO, UploadCustomerDTO, UploadCustomerResultDTO } from "../types/dtos/customer";
import { AnyKeys } from "mongoose";
import { _FilterQuery } from "../repositories/baseRepository";
import customerRepository from "../repositories/customerRepository";
import { CustomerError } from "../errors/customerErrors";
import { IUploadService } from "../types/interfaces/service";
import { commitUpload, verifyUpload } from "../utils/upload";
import { UploadError } from "../errors/base";

class CustomerService
    extends BaseService<ICustomer, any, UpdateCustomerDTO>
    implements IUploadService<UploadCustomerDTO, ICustomer, UploadCustomerResultDTO>
{
    constructor() {
        super(customerRepository, {
            NOT_FOUND: CustomerError.NOT_FOUND,
        });
    }

    async _beforeCreate(dto: any, createdBy: string): Promise<Partial<ICustomer>> {
        return { ...dto, need_review: true };
    }

    async _beforeUpdate(dto: UpdateCustomerDTO, updatedBy: string, existed: ICustomer): Promise<AnyKeys<ICustomer>> {
        return { ...dto, need_review: false };
    }

    _mapSearchToQuery(search: any): _FilterQuery<ICustomer> {
        return {};
    }

    async commitUpload(dtoList: UploadCustomerResultDTO[], uploadedBy: string): Promise<ICustomer[]> {
        const data = await this.verifyUpload(dtoList);
        return commitUpload(data, customerRepository, uploadedBy, async (dto, s) => {
            return this.create(dto, uploadedBy, s);
        });
    }

    verifyUpload(dtoList: UploadCustomerDTO[]): Promise<UploadCustomerResultDTO[]> {
        const existedCode: Set<string> = new Set();
        return verifyUpload(dtoList, async (dto, lineNumber) => {
            const existed = await customerRepository.findByCode(dto.code);
            if (existed) return;

            if (existedCode.has(dto.code)) {
                throw new UploadError("Duplicated code", lineNumber);
            }
            existedCode.add(dto.code);
            return dto;
        });
    }
}

export default new CustomerService();

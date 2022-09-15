import { Initializer } from "./Initializer";
import { ICustomer } from "../../types/models/ICustomer";
import { ClientSession } from "mongoose";
import customerRepository from "../../repositories/customerRepository";
import customerService from "../../services/customerService";

interface ICustomerCode {
    customer_code: string;
    customer?: null | {
        id: string;
    };
}

export class CustomerInitializer<DTO extends ICustomerCode> extends Initializer<ICustomer, DTO> {
    protected async getData({ customer }: DTO, updatedBy: string, s: ClientSession): Promise<ICustomer | null> {
        await customerRepository.addContributor([customer!.id], updatedBy);
        return customerRepository.findById(customer!.id);
    }

    protected getKey(dto: DTO): string {
        return dto.customer_code;
    }

    protected insert({ customer_code }: DTO, updatedBy: string, s: ClientSession): Promise<ICustomer> {
        return customerService.create({ code: customer_code }, updatedBy, s);
    }

    protected shouldInsert({ customer }: DTO): boolean {
        return !customer?.id;
    }
}

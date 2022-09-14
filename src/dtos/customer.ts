import { BaseResultDTO } from "./base";
import { ICustomer } from "../types/models/ICustomer";

export class CustomerResultDTO extends BaseResultDTO {
    code: string;
    company?: string;
    address?: string;
    tax_code?: string;

    constructor(customer: ICustomer) {
        super(customer);
        this.code = customer.code;
        this.company = customer.company;
        this.address = customer.address;
        this.tax_code = customer.tax_code;
    }
}

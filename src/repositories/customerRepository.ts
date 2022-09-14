import { BaseRepository } from "./baseRepository";
import { ICustomer, ICustomerModel, ICustomerUpload, ICustomerUploadModel } from "../types/models/ICustomer";
import { CustomerModel, CustomerUploadModel } from "../models/customer";

class CustomerRepository extends BaseRepository<ICustomer, ICustomerModel, ICustomerUpload, ICustomerUploadModel> {
    constructor() {
        super(CustomerModel, CustomerUploadModel);
    }

    findByCode(code: string) {
        return this.findFirst({ code });
    }
}

export default new CustomerRepository();

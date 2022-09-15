import { generateSchema, generateUploadSchema } from "../utils/mongo";
import {
    ICustomer,
    ICustomerDocument,
    ICustomerModel,
    ICustomerUpload,
    ICustomerUploadDocument,
    ICustomerUploadModel,
} from "../types/models/ICustomer";
import { model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const CustomerSchema = generateSchema<ICustomer>({
    code: String,
    address: String,
    company: String,
    tax_code: String,
    need_review: Boolean,
});

CustomerSchema.plugin(paginate);

CustomerSchema.index({ code: 1 }, { unique: true });

export const CustomerModel = model<ICustomerDocument, ICustomerModel>("Customer", CustomerSchema);

const CustomerUploadSchema = generateUploadSchema<ICustomerUpload>({
    code: { type: String, unique: true },
    address: String,
    company: String,
    tax_code: String,
});
export const CustomerUploadModel = model<ICustomerUploadDocument, ICustomerUploadModel>(
    "CustomerUpload",
    CustomerUploadSchema,
    "customer_uploads"
);

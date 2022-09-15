import { UploadProjectDTO } from "../types/dtos/project";
import { UploadBindingPackageDTO } from "../types/dtos/bindingPackage";
import { UploadCustomerDTO } from "../types/dtos/customer";
import { UploadMainContractDTO } from "../types/dtos/mainContract";

export type ExcelMapping<Schema = any> = {
    [key in keyof Schema]: string;
};

export const IMPORT_PROJECT_KEY: ExcelMapping<UploadProjectDTO> = {
    code: "Tên dự án",
    description: "Thông tin dự án",
};

export const IMPORT_BINDING_PACKAGE_KEY: ExcelMapping<UploadBindingPackageDTO> = {
    code: "Tên gói thầu",
    description: "Thông tin gói thầu",
    project_code: "Tên dự án",
};

export const IMPORT_CUSTOMER_KEY: ExcelMapping<UploadCustomerDTO> = {
    code: "Tên khách hàng",
    address: "Địa chỉ",
    company: "Công ty",
    tax_code: "Mã thuế",
};

export const IMPORT_MAIN_CONTRACT_KEY: ExcelMapping<UploadMainContractDTO> = {
    code: "Số HDC",
    signed_at: "Ngày ký HDC",
    customer_code: "Khách hàng",
    binding_package_code: "Tên gói thầu",
    project_code: "Công trình/dự án",
    value: "Giá trị HDC",
    description: "Hạng mục HDC",
};

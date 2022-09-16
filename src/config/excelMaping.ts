import { UploadProjectDTO } from "../types/dtos/project";
import { UploadBindingPackageDTO } from "../types/dtos/bindingPackage";
import { UploadCustomerDTO } from "../types/dtos/customer";
import { UploadMainContractDTO } from "../types/dtos/mainContract";
import { UploadIncomeDTO } from "../types/dtos/income";
import { UploadFinanceDTO } from "../types/dtos/finance";
import { UploadExecutorDTO } from "../types/dtos/executor";

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

export const IMPORT_INCOME_KEY: ExcelMapping<UploadIncomeDTO> = {
    main_contract_code: "Số HDC",
    acceptance_note: "Nội dung nghiệm thu của đợt",
    acceptance_value: " Gt xuất hóa đơn (nghiệm thu)",
    invoice_code: "Số Hóa Đơn",
    invoice_date: "Ngày hóa đơn",
    vat_10: "VAT 10%",
    vat_8: "VAT 8%",
    taxable_value: "GT Sau Thuế",
    payment_request_code: "Ref. No. Giấy DNTT",
    payment_request_date: "Ngày Giấy DNTT",
    payment_request_value: "Số Tiền Giấy DNTT",
    advance_refund_value: "Hoàn trả TƯ",
    retention_value: "Giữ lại",
    received_date: "Ngày nhận",
    received_value: "Số Tiền nhận",
    deduction_value: "GT Gán trừ",
    note: "Ghi chú",
};

export const IMPORT_FINANCE_KEY: ExcelMapping<Required<UploadFinanceDTO>> = {
    main_contract_code: "Số HDC",
    mc_value: "Giá trị HDC",
    contract_distributed_value: "Giá trị phân bổ HDC tương ứng khi GK",
    contract_execution_value: "Chi phí thi công TT khi GK",
    contract_year: "Năm thực hiện",
    contract_rate: "Tỷ lệ GK (%)",
    settlement_distributed_value: "Giá trị phân bổ HDC tương ứng khi QT",
    settlement_execution_value: "Chi phí thi công TT khi QT",
    settlement_year: "Năm QT",
    settlement_rate: "Tỷ lệ QT (%)",
};

export const IMPORT_EXECUTOR_KEY: ExcelMapping<Required<UploadExecutorDTO>> = {
    code: "DVTT",
    info: "Thông tin DVTT",
};

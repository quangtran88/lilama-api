import { BaseResultDTO } from "./base";
import { IFinance } from "../types/models/IFinance";
import { Types } from "mongoose";
import { mapId } from "../utils/dto";

export class FinanceResultDTO extends BaseResultDTO {
    main_contract: {
        id: Types.ObjectId;
        code: string;
        need_review?: boolean;
    };
    mc_value?: number;
    contract_distributed_value?: number;
    contract_execution_value?: number;
    contract_retention_value?: number;
    contract_year?: number;
    contract_rate?: number;
    contract_final_value?: number;
    contract_net_profit?: number;
    settlement_distributed_value?: number;
    settlement_execution_value?: number;
    settlement_retention_value?: number;
    settlement_year?: number;
    settlement_rate?: number;
    settlement_final_value?: number;
    settlement_net_profit?: number;

    constructor(finance: IFinance) {
        super(finance);
        this.main_contract = mapId(finance.main_contract);
        this.mc_value = finance.mc_value;
        this.contract_distributed_value = finance.contract_distributed_value;
        this.contract_execution_value = finance.contract_execution_value;
        this.contract_retention_value = finance.contract_retention_value;
        this.contract_year = finance.contract_year;
        this.contract_rate = finance.contract_rate;
        this.contract_final_value = finance.contract_final_value;
        this.contract_net_profit = finance.contract_net_profit;
        this.settlement_distributed_value = finance.settlement_distributed_value;
        this.settlement_execution_value = finance.settlement_execution_value;
        this.settlement_retention_value = finance.settlement_retention_value;
        this.settlement_year = finance.settlement_year;
        this.settlement_rate = finance.settlement_rate;
        this.settlement_final_value = finance.settlement_final_value;
        this.settlement_net_profit = finance.settlement_net_profit;
    }
}

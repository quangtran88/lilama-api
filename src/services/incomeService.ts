import { BaseService } from "./baseService";
import { IIncome } from "../types/models/IIncome";
import { UpdateIncomeDTO, UploadIncomeDTO, UploadIncomeResultDTO } from "../types/dtos/income";
import { IUploadService } from "../types/interfaces/service";
import IncomeRepository from "../repositories/incomeRepository";
import incomeRepository from "../repositories/incomeRepository";
import { IncomeError } from "../errors/incomeErrors";
import { AnyKeys, ClientSession } from "mongoose";
import { _FilterQuery, BaseRepository } from "../repositories/baseRepository";
import { commitUpload, verifyUpload } from "../utils/upload";
import { initCache } from "../utils/cache";
import { IMainContract } from "../types/models/IMainContract";
import mainContractRepository from "../repositories/mainContractRepository";
import { MainContractResultDTO } from "../dtos/mainContract";
import { MainContractInitializer } from "../utils/initializer/MainContractInitializer";
import { safeNumber } from "../utils/number";
import { SYSTEM } from "../config/common";

const ADVANCE_PAYMENT_NOTE = "Tạm ứng";

class IncomeService
    extends BaseService<IIncome, any, UpdateIncomeDTO>
    implements IUploadService<UploadIncomeDTO, IIncome, UploadIncomeResultDTO>
{
    constructor() {
        super(IncomeRepository, { NOT_FOUND: IncomeError.NOT_FOUND });
    }

    async _beforeCreate(dto: Partial<IIncome>, createdBy: string, session?: ClientSession): Promise<Partial<IIncome>> {
        const payment_request_debt = this.calculatePaymentRequestDebt(
            dto.payment_request_value,
            dto.received_value,
            dto.deduction_value
        );
        const is_advance_payment = this.isAdvancePayment(dto.note);
        const remainingAdvanceValue = await this.getRemainingAdvanceValue(dto.main_contract!.code, session);
        const remaining_advance_refund = is_advance_payment
            ? remainingAdvanceValue + safeNumber(dto.received_value)
            : remainingAdvanceValue - safeNumber(dto.advance_refund_value);
        return { ...dto, is_advance_payment, payment_request_debt, remaining_advance_refund };
    }

    async _beforeUpdate(dto: UpdateIncomeDTO, updatedBy: string, existed: IIncome): Promise<AnyKeys<IIncome>> {
        const payment_request_debt = this.calculatePaymentRequestDebt(
            dto.payment_request_value || existed.payment_request_value,
            dto.received_value || existed.received_value,
            dto.deduction_value || existed.deduction_value
        );
        const note = dto.note || existed.note;
        const is_advance_payment = this.isAdvancePayment(note);
        const remaining_advance_refund = await this.recalculateRAR(dto, existed, is_advance_payment);

        if (remaining_advance_refund != existed.remaining_advance_refund) {
            await this.recalculateRARSinceDate(
                existed.main_contract.code,
                existed.created_at,
                remaining_advance_refund
            );
        }
        return { ...dto, payment_request_debt, is_advance_payment, remaining_advance_refund };
    }

    _mapSearchToQuery(search: any): _FilterQuery<IIncome> {
        return {};
    }

    async _updateDependencyData(
        dependencyRepo: BaseRepository<any, any>,
        existed: IIncome,
        dto: UpdateIncomeDTO,
        updatedBy: string
    ): Promise<void> {
        return;
    }

    async commitUpload(dtoList: UploadIncomeResultDTO[], uploadedBy: string): Promise<IIncome[]> {
        const data = await this.verifyUpload(dtoList);
        const mainContractInitializer = new MainContractInitializer();
        return commitUpload(data, incomeRepository, uploadedBy, async (dto, s) => {
            const main_contract = await mainContractInitializer.init(dto, uploadedBy, s);
            return this.create({ ...dto, main_contract }, uploadedBy, s);
        });
    }

    async verifyUpload(dtoList: UploadIncomeDTO[]): Promise<UploadIncomeResultDTO[]> {
        const getMainContractCache = initCache<IMainContract>((code) => mainContractRepository.findByCode(code));
        return verifyUpload(dtoList, async (dto) => {
            const mainContract = await getMainContractCache(dto.main_contract_code);
            return { ...dto, main_contract: mainContract && new MainContractResultDTO(mainContract) };
        });
    }

    calculatePaymentRequestDebt(paymentRequestValue = 0, receivedValue = 0, deductionValue = 0) {
        return paymentRequestValue - receivedValue - deductionValue;
    }

    isAdvancePayment(note = "") {
        return note == ADVANCE_PAYMENT_NOTE;
    }

    async getRemainingAdvanceValue(mainContractCode: string, session?: ClientSession) {
        const lastIncome = await incomeRepository.findFirst(
            { "main_contract.code": mainContractCode, is_advance_payment: false },
            { created_at: -1 },
            session
        );
        const lastAdvance = await incomeRepository.findFirst(
            { "main_contract.code": mainContractCode, is_advance_payment: true },
            { created_at: -1 },
            session
        );
        if (!lastIncome) {
            return safeNumber(lastAdvance?.received_value);
        }
        if (!lastAdvance || lastIncome.created_at.valueOf() >= lastAdvance.created_at.valueOf()) {
            return safeNumber(lastIncome?.remaining_advance_refund);
        }
        return safeNumber(lastIncome.remaining_advance_refund) + safeNumber(lastAdvance.received_value);
    }

    async recalculateRARSinceDate(mainContractCode: string, createdSince: Date, lastRemaining: number) {
        const incomes = await incomeRepository.find(
            { "main_contract.code": mainContractCode, created_at: { $gt: createdSince } },
            { created_at: -1 }
        );
        let remaining = lastRemaining;
        for (const income of incomes) {
            if (income.is_advance_payment) {
                remaining += safeNumber(income.received_value);
            } else {
                remaining -= safeNumber(income.advance_refund_value);
            }
            await incomeRepository.updateById(income._id, { remaining_advance_refund: remaining }, SYSTEM);
        }
    }

    async recalculateRAR(dto: UpdateIncomeDTO, existed: IIncome, is_advance_payment: boolean) {
        let remainingAdvanceRefund = safeNumber(existed.remaining_advance_refund);
        if (is_advance_payment && dto.received_value && dto.received_value != existed.received_value) {
            const diff = dto.received_value - safeNumber(existed.received_value);
            remainingAdvanceRefund += diff;
        }
        if (
            !is_advance_payment &&
            dto.advance_refund_value &&
            dto.advance_refund_value != existed.advance_refund_value
        ) {
            const diff = dto.advance_refund_value - safeNumber(existed.advance_refund_value);
            remainingAdvanceRefund -= diff;
        }
        return remainingAdvanceRefund;
    }
}

export default new IncomeService();
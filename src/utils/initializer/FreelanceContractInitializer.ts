import { Initializer } from "./Initializer";
import { IFreelanceContract } from "../../types/models/IFreelanceContract";
import { ClientSession } from "mongoose";
import freelanceContractService from "../../services/freelanceContractService";
import freelanceContractRepository from "../../repositories/freelanceContractRepository";
import executorRepository from "../../repositories/executorRepository";
import mainContractRepository from "../../repositories/mainContractRepository";
import managerRepository from "../../repositories/managerRepository";
import executorService from "../../services/executorService";
import managerService from "../../services/managerService";
import mainContractService from "../../services/mainContractService";
import bindingPackageService from "../../services/bindingPackageService";
import projectService from "../../services/projectService";
import customerService from "../../services/customerService";

interface IFreelanceContractCode {
    freelance_contract_code: string;
    freelance_contract?: null | {
        id: string;
    };
}

export class FreelanceContractInitializer<DTO extends IFreelanceContractCode> extends Initializer<
    IFreelanceContract,
    DTO
> {
    protected async getData(dto: DTO, updatedBy: string, s: ClientSession): Promise<IFreelanceContract | null> {
        const existed = await freelanceContractRepository.findByCode(dto.freelance_contract_code);
        await freelanceContractRepository.addContributor([dto.freelance_contract!.id], updatedBy, s);
        await executorRepository.addContributor([existed!.executor._id], updatedBy, s);
        await mainContractRepository.addContributor([existed!.main_contract._id], updatedBy, s);
        await managerRepository.addContributor([existed!.manager._id], updatedBy, s);
        return existed;
    }

    protected getKey(dto: DTO): string {
        return dto.freelance_contract_code;
    }

    protected async insert(
        { freelance_contract_code }: DTO,
        updatedBy: string,
        s: ClientSession
    ): Promise<IFreelanceContract> {
        const executor = await executorService.getTemp();
        const manager = await managerService.getTemp();
        const project = await projectService.getTemp();
        const binding_package = await bindingPackageService.getTemp({ project });
        const customer = await customerService.getTemp();
        const main_contract = await mainContractService.getTemp({ binding_package, project, customer });
        return freelanceContractService.create(
            { code: freelance_contract_code, executor, manager, main_contract },
            updatedBy,
            s
        );
    }

    protected shouldInsert({ freelance_contract }: DTO): boolean {
        return !freelance_contract?.id;
    }
}

import { Initializer } from "./Initializer";
import { IMainContract } from "../../types/models/IMainContract";
import { ClientSession } from "mongoose";
import mainContractService from "../../services/mainContractService";
import mainContractRepository from "../../repositories/mainContractRepository";
import projectRepository from "../../repositories/projectRepository";
import bindingPackageRepository from "../../repositories/bindingPackageRepository";
import customerRepository from "../../repositories/customerRepository";
import projectService from "../../services/projectService";
import customerService from "../../services/customerService";
import bindingPackageService from "../../services/bindingPackageService";

interface IMainContractCode {
    main_contract_code: string;
    main_contract?: null | {
        id: string;
    };
}

export class MainContractInitializer<DTO extends IMainContractCode> extends Initializer<IMainContract, DTO> {
    protected async getData(dto: DTO, updatedBy: string, s: ClientSession): Promise<IMainContract | null> {
        const existed = await mainContractRepository.findByCode(dto.main_contract_code);
        await mainContractRepository.addContributor([dto.main_contract!.id], updatedBy, s);
        await projectRepository.addContributor([existed!.project._id], updatedBy, s);
        await bindingPackageRepository.addContributor([existed!.binding_package._id], updatedBy, s);
        await customerRepository.addContributor([existed!.customer._id], updatedBy, s);
        return existed;
    }

    protected getKey(dto: DTO): string {
        return dto.main_contract_code;
    }

    protected async insert({ main_contract_code }: DTO, updatedBy: string, s: ClientSession): Promise<IMainContract> {
        const project = await projectService.getTemp();
        const customer = await customerService.getTemp();
        const binding_package = await bindingPackageService.getTemp();
        return mainContractService.create(
            { code: main_contract_code, project, customer, binding_package },
            updatedBy,
            s
        );
    }

    protected shouldInsert({ main_contract }: DTO): boolean {
        return !main_contract?.id;
    }
}

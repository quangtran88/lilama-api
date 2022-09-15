import { Initializer } from "./Initializer";
import { IMainContract } from "../../types/models/IMainContract";
import { ClientSession } from "mongoose";
import mainContractService from "../../services/mainContractService";
import mainContractRepository from "../../repositories/mainContractRepository";
import projectRepository from "../../repositories/projectRepository";
import bindingPackageRepository from "../../repositories/bindingPackageRepository";
import customerRepository from "../../repositories/customerRepository";

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
        existed?.project && (await projectRepository.addContributor([existed!.project._id], updatedBy, s));
        existed?.binding_package &&
            (await bindingPackageRepository.addContributor([existed!.binding_package._id], updatedBy, s));
        existed?.customer && (await customerRepository.addContributor([existed!.customer._id], updatedBy, s));
        return existed;
    }

    protected getKey(dto: DTO): string {
        return dto.main_contract_code;
    }

    protected insert({ main_contract_code }: DTO, updatedBy: string, s: ClientSession): Promise<IMainContract> {
        return mainContractService.create({ code: main_contract_code }, updatedBy, s);
    }

    protected shouldInsert({ main_contract }: DTO): boolean {
        return !main_contract?.id;
    }
}

import { Injectable } from '@nestjs/common';
import { ContractRepository } from '../../../domain/repositories/project/contract.repository';
import { IFindByIdContractCommand } from './find-by-id-contract.command';
import { ContractNotFoundException } from '../../../domain/exceptions/contract/contract-not-found.exception';

@Injectable()
export class FindByIdContractUseCase {
  public constructor(
    private readonly contractsRepository: ContractRepository,
  ) {}

  public async execute(command: IFindByIdContractCommand) {
    const contract = await this.contractsRepository.findById(command.contractId)
    if(!contract) {
      throw new ContractNotFoundException()
    }

    return contract
  }
}
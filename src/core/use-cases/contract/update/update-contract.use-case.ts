import { Injectable } from '@nestjs/common';
import { ContractRepository } from '../../../domain/repositories/project/contract.repository';
import { IUpdateContractCommand } from './update-contract.command';
import { ContractNotFoundException } from '../../../domain/exceptions/contract/contract-not-found.exception';

@Injectable()
export class UpdateContractUseCase {
  public constructor(
    private readonly contractRepository: ContractRepository
  ) {
  }

  public async execute(command: IUpdateContractCommand) {
    const contract = await this.contractRepository.findById(command.contractId);

    if(!contract) {
      throw new ContractNotFoundException()
    }

    if(command.isClientAccepted) {
      contract.acceptByClient()
    }

    if(command.isContractorAccepted) {
      contract.acceptByContractor()
    }

    if(command.amount) {
      contract.updateAmount(command.amount)
    }
    
    return this.contractRepository.update(
      contract.id,
      contract
    )
  }
}
import { Injectable } from '@nestjs/common';
import { ContractRepository } from '../../../domain/repositories/project/contract.repository';
import { ContractFiltersValueObject } from '../../../domain/value-objects/contract/contract-filters.value.object';
import { IFindAllContractCommand } from './find-all-contract.command';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllContractUseCase {
  public constructor(
    private readonly contractsRepository: ContractRepository,
  ) {}

  public async execute(command: IFindAllContractCommand) {
    const params = new ContractFiltersValueObject(
      command.amountMin,
      command.amountMax,
      command.clientId,
      command.contractorId,
      command.createdAtStart,
      command.createdAtEnd,
      command.taskId,
      command.serviceId
    );
    const pagination = new PaginationParamsValueObject(command.page, command.limit)

    return this.contractsRepository.findAll(params, pagination)
  }
}
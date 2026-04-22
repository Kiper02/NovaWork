import { Injectable } from '@nestjs/common';
import { BeneficiaryRepository } from '../../../../domain/repositories/finance/beneficiary.repository';
import { IFindAllBeneficiaryCommand } from './find-all-beneficiary.command';
import {
  BeneficiaryFiltersValueObject
} from '../../../../domain/value-objects/beneficiary/beneficiary-filters.value.object';
import { PaginationParamsValueObject } from '../../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllBeneficiaryUseCase {
  public constructor(
    private readonly beneficiaryRepository: BeneficiaryRepository
  ) {
  }

  public async execute(command: IFindAllBeneficiaryCommand) {
    const params = new BeneficiaryFiltersValueObject(
      command.accountId,
      command.type,
      command.createdAtStart,
      command.createdAtEnd
    )

    const pagination = new PaginationParamsValueObject(command.page, command.limit);

    return this.beneficiaryRepository.findAll(params, pagination);
  }
}
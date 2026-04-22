import { Injectable } from '@nestjs/common';
import { BankDetailsRepository } from '../../../../domain/repositories/finance/bank-details.repository';
import { IFindAllBankDetailsCommand } from './find-all-bank-details.command';
import {
  BankDetailsFiltersValueObject
} from '../../../../domain/value-objects/bank-details/bank-details-filters.value.object';
import { PaginationParamsValueObject } from '../../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllBankDetailsUseCase {
  public constructor(
    private readonly bankDetailsRepository: BankDetailsRepository,
  ) {}

  public async execute(command: IFindAllBankDetailsCommand) {
    const params = new BankDetailsFiltersValueObject(
      command.beneficiaryId,
      command.type,
    );

    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );

    return this.bankDetailsRepository.findAll(params, pagination);
  }
}
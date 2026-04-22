import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { IFindAllAccountCommand } from './find-all-account.command';
import { AccountFiltersValueObject } from '../../../domain/value-objects/account/account-filters.value-object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllAccountUseCase {
  public constructor(private readonly accountRepository: AccountRepository) {}

  public async execute(command: IFindAllAccountCommand) {
    const params = new AccountFiltersValueObject(command.userId);

    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );
    return this.accountRepository.findAll(params, pagination);
  }
}
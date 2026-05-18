import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/repositories/finance/transaction-repository';
import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { IFindMyTransactionsCommand } from './find-my-transactions.command';
import { AccountNotFoundException } from '../../../domain/exceptions/account/account-not-found.exception';
import {
  TransactionFiltersValueObject,
} from '../../../domain/value-objects/finance/transactions/transaction-filters.value-object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindMyTransactionsUseCase {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  public async execute(command: IFindMyTransactionsCommand) {
    const account = await this.accountRepository.findByUserId(command.userId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const filters = new TransactionFiltersValueObject(
      account.id,
      command.startDate,
      command.endDate,
      command.type,
      command.status,
    );

    const pagination = new PaginationParamsValueObject(command.page, command.limit);

    return this.transactionRepository.findAll(filters, pagination);
  }
}

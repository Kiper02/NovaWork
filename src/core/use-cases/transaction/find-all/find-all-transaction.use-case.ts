import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/repositories/finance/transaction-repository';
import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { IFindAllTransactionCommand } from './find-all-transaction.command';
import { AccountNotFoundException } from '../../../domain/exceptions/account/account-not-found.exception';
import {
  TransactionFiltersValueObject
} from '../../../domain/value-objects/finance/transactions/transaction-filters.value-object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllTransactionUseCase {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository
  ) {
  }

  public async execute(command: IFindAllTransactionCommand) {
    let accountId: string | undefined;

    if (command.userId) {
      const account = await this.accountRepository.findByUserId(command.userId);
      if (!account) {
        throw new AccountNotFoundException()
      }
      accountId = account.id;
    }

    const filters = new TransactionFiltersValueObject(
      accountId,
      command.startDate,
      command.endDate,
      command.type,
      command.status
    )

    const pagination = new PaginationParamsValueObject(command.page, command.limit)

    return this.transactionRepository.findAll(filters, pagination);
  }
}
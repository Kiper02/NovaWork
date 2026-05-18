import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/repositories/finance/transaction-repository';
import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { IDeleteTransactionCommand } from './delete-transaction.command';
import { TransactionNotFoundException } from '../../../domain/exceptions/transaction/transaction-not-found.exception';
import { AccountNotFoundException } from '../../../domain/exceptions/account/account-not-found.exception';

@Injectable()
export class DeleteTransactionUseCase {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  public async execute(command: IDeleteTransactionCommand) {
    const transaction = await this.transactionRepository.findById(command.transactionId);
    if (!transaction) {
      throw new TransactionNotFoundException();
    }

    const account = await this.accountRepository.findById(transaction.accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    if (account.userId !== command.userId) {
      throw new TransactionNotFoundException();
    }

    await this.transactionRepository.delete(command.transactionId);
  }
}

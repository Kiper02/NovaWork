import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/repositories/finance/transaction-repository';
import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { ICreateTransactionCommand } from './create-transaction.command';
import { TransactionEntity } from '../../../domain/entities/finance/transaction.entity';
import { v4 as uuid } from 'uuid';
import { AccountNotFoundException } from '../../../domain/exceptions/account/account-not-found.exception';

@Injectable()
export class CreateTransactionUseCase {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly accountRepository: AccountRepository,
  ) {}

  public async execute(command: ICreateTransactionCommand) {
    const account = await this.accountRepository.findById(command.accountId);
    if (!account) {
      throw new AccountNotFoundException();
    }

    const transactionEntity = new TransactionEntity(
      uuid(),
      command.title,
      command.description || '',
      command.amount,
      command.type,
      'PENDING' as any,
      command.accountId,
      new Date(),
      new Date(),
    );

    return this.transactionRepository.save(transactionEntity);
  }
}

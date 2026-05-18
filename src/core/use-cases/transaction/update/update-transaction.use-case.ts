import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../../domain/repositories/finance/transaction-repository';
import { TransactionEntity } from '../../../domain/entities/finance/transaction.entity';
import { IUpdateTransactionCommand } from './update-transaction.command';
import { TransactionNotFoundException } from '../../../domain/exceptions/transaction/transaction-not-found.exception';

@Injectable()
export class UpdateTransactionUseCase {
  public constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  public async execute(command: IUpdateTransactionCommand) {
    const existingTransaction = await this.transactionRepository.findById(command.id);
    if (!existingTransaction) {
      throw new TransactionNotFoundException();
    }

    const updateData: any = {};

    if (command.title !== undefined) updateData.title = command.title;
    if (command.description !== undefined) updateData.description = command.description;
    if (command.amount !== undefined) updateData.amount = command.amount;
    if (command.type !== undefined) updateData.type = command.type;
    if (command.status !== undefined) updateData.status = command.status;
    updateData.updatedAt = new Date();

    return this.transactionRepository.update(command.id, updateData);
  }
}

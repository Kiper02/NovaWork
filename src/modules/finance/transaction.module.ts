import { Module } from '@nestjs/common';
import { TransactionsController } from '../../presentation/controllers/transactions.controller';
import { CreateTransactionUseCase } from '../../core/use-cases/transaction/create/create-transaction.use-case';
import { UpdateTransactionUseCase } from '../../core/use-cases/transaction/update/update-transaction.use-case';
import { FindAllTransactionUseCase } from '../../core/use-cases/transaction/find-all/find-all-transaction.use-case';
import { FindMyTransactionsUseCase } from '../../core/use-cases/transaction/find-my/find-my-transactions.use-case';
import { FindByIdTransactionUseCase } from '../../core/use-cases/transaction/find-by-id/find-by-id-transaction.use-case';
import { DeleteTransactionUseCase } from '../../core/use-cases/transaction/delete/delete-transaction.use-case';
import { GetStatisticsUseCase } from '../../core/use-cases/transaction/get-statistics/get-statistics.use-case';

@Module({
  controllers: [TransactionsController],
  providers: [
    CreateTransactionUseCase,
    UpdateTransactionUseCase,
    FindAllTransactionUseCase,
    FindMyTransactionsUseCase,
    FindByIdTransactionUseCase,
    DeleteTransactionUseCase,
    GetStatisticsUseCase,
  ],
})
export class TransactionModule {}

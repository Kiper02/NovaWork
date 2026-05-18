import { CreateTransactionDto } from '../dto/transaction/create-transaction.dto';
import { UpdateTransactionDto } from '../dto/transaction/update-transaction.dto';
import { FindAllTransactionQueryDto } from '../dto/transaction/find-all-transaction-query.dto';
import { StatisticsQueryDto } from '../dto/transaction/statistics-query.dto';
import { TransactionResponseDto } from '../dto/transaction/transaction-response.dto';
import { StatisticsResponseDto } from '../dto/finance/statistics-response.dto';
import { TransactionEntity } from '../../core/domain/entities/finance/transaction.entity';
import { ICreateTransactionCommand } from '../../core/use-cases/transaction/create/create-transaction.command';
import { IUpdateTransactionCommand } from '../../core/use-cases/transaction/update/update-transaction.command';
import { IFindAllTransactionCommand } from '../../core/use-cases/transaction/find-all/find-all-transaction.command';
import { IFindMyTransactionsCommand } from '../../core/use-cases/transaction/find-my/find-my-transactions.command';
import { IGetStatisticsCommand } from '../../core/use-cases/transaction/get-statistics/get-statistics.command';
import { StatisticsValueObject } from '../../core/domain/value-objects/finance/statistics/statistics.value-object';

export class TransactionMapper {
  public static toCreateCommand(
    dto: CreateTransactionDto,
    accountId: string,
  ): ICreateTransactionCommand {
    return {
      accountId: accountId,
      title: dto.title,
      description: dto.description,
      amount: dto.amount,
      type: dto.type,
    };
  }

  public static toUpdateCommand(
    transactionId: string,
    dto: UpdateTransactionDto,
  ): IUpdateTransactionCommand {
    return {
      id: transactionId,
      title: dto.title,
      description: dto.description,
      amount: dto.amount,
      type: dto.type,
      status: dto.status,
    };
  }

  public static toFindAllCommand(
    query: FindAllTransactionQueryDto,
  ): IFindAllTransactionCommand {
    return {
      userId: undefined as any,
      page: query.page,
      limit: query.limit,
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
      type: query.type,
      status: query.status,
    };
  }

  public static toFindMyCommand(
    userId: string,
    query: FindAllTransactionQueryDto,
  ): IFindMyTransactionsCommand {
    return {
      userId: userId,
      page: query.page,
      limit: query.limit,
      startDate: query.startDate ? new Date(query.startDate) : undefined,
      endDate: query.endDate ? new Date(query.endDate) : undefined,
      type: query.type,
      status: query.status,
    };
  }

  public static toResponse(entity: TransactionEntity): TransactionResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      amount: entity.amount,
      type: entity.type,
      status: entity.status,
      accountId: entity.accountId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toStatisticsCommand(
    userId: string,
    query: StatisticsQueryDto,
  ): IGetStatisticsCommand {
    return {
      userId: userId,
      startDate: query.startDate,
      endDate: query.endDate,
    } as any;
  }

  public static toStatisticsResponse(stats: StatisticsValueObject): StatisticsResponseDto {
    return {
      income: stats.income,
      expense: stats.expense,
      percent: stats.income - stats.expense,
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import type { Prisma } from '@prisma/client';
import {
  StatisticsFiltersValueObject
} from '../../../../../core/domain/value-objects/finance/statistics/statistics-filters.value-object';
import {
  StatisticsValueObject
} from '../../../../../core/domain/value-objects/finance/statistics/statistics.value-object';
import { EnumTransactionType } from '../../../../../core/domain/entities/finance/transaction.entity';
import {
  TransactionQueryRepository
} from '../../../../../core/domain/repositories/finance/transaction-query.repository';

@Injectable()
export class TransactionQueryRepositoryImpl implements TransactionQueryRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async getStatistics(
    filters: StatisticsFiltersValueObject,
  ): Promise<StatisticsValueObject> {
    const where = this.buildWhere(filters);

    const depositAgg = await this.prismaService.transaction.aggregate({
      where: {
        ...where,
        type: EnumTransactionType.DEPOSIT,
      },
      _sum: { amount: true },
    });

    const withdrawalAgg = await this.prismaService.transaction.aggregate({
      where: {
        ...where,
        type: EnumTransactionType.WITHDRAWAL,
      },
      _sum: { amount: true },
    });

    const deposit = depositAgg._sum.amount ?? 0;
    const withdrawal = withdrawalAgg._sum.amount ?? 0;

    return new StatisticsValueObject(Number(deposit), Number(withdrawal), 0);
  }

  private buildWhere(filters: StatisticsFiltersValueObject) {
    const where: Prisma.TransactionWhereInput = {
      accountId: filters.accountId,
    };

    if (filters.startDate) {
      where.createdAt = {
        gte: filters.startDate,
      };
    }

    if (filters.endDate) {
      where.createdAt = {
        lte: filters.endDate,
      };
    }

    return where;
  }
}

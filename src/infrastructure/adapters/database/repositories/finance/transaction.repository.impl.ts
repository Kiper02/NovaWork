import { TransactionRepository } from '../../../../../core/domain/repositories/finance/transaction-repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { TransactionEntity } from '../../../../../core/domain/entities/finance/transaction.entity';
import { TransactionMapper } from '../../mappers/finance/transaction.mapper';
import { TransactionFiltersValueObject } from '../../../../../core/domain/value-objects/finance/transactions/transaction-filters.value-object';
import type { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import {
  PaginationParamsValueObject
} from '../../../../../core/domain/value-objects/shared/pagination-params.value-object';
import {
  PaginatedResultValueObject
} from '../../../../../core/domain/value-objects/shared/paginated-result.value-object';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: TransactionEntity): Promise<TransactionEntity> {
    const model = TransactionMapper.toModel(entity);
    const result = await this.prismaService.transaction.create({
      data: model,
    });

    return TransactionMapper.toEntity(result);
  }

  public async update(
    id: string,
    data: Partial<Omit<TransactionEntity, 'id'>>,
  ): Promise<TransactionEntity> {
    const updateData = TransactionMapper.toModelUpdate(data);
    const result = await this.prismaService.transaction.update({
      where: { id },
      data: updateData,
    });
    return TransactionMapper.toEntity(result);
  }

  public async findById(id: string): Promise<TransactionEntity | null> {
    const result = await this.prismaService.transaction.findUnique({
      where: { id },
    });

    if (!result) {
      return null;
    }

    return TransactionMapper.toEntity(result);
  }

  public async delete(id: string): Promise<void> {
    await this.prismaService.transaction.delete({
      where: { id },
    });
  }

  public async findAll(
    params: TransactionFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TransactionEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.transaction.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.transaction.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(TransactionMapper.toEntity),
      total,
      pagination,
    );
  }

  private buildWhere(
    filters: TransactionFiltersValueObject,
  ): Prisma.TransactionWhereInput {
    const where: Prisma.TransactionWhereInput = { accountId: filters.accountId };

    if (filters.startDate && filters.endDate) {
      where.createdAt = {
        gte: filters.startDate,
        lte: filters.endDate,
      };
    }

    if (filters.type) {
      where.type = filters.type;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return where;
  }
}

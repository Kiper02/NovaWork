import { AccountRepository } from '../../../core/domain/repositories/account.repository';
import { PrismaService } from '../orm/prisma-recource/prisma.service';
import { AccountEntity } from '../../../core/domain/entities/account.entity';
import { AccountMapper } from '../mappers/account.mapper';
import { AccountFiltersValueObject } from '../../../core/domain/value-objects/account/account-filters.value-object';
import { PaginationParamsValueObject } from '../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../core/domain/value-objects/shared/paginated-result.value-object';
import type { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: AccountEntity): Promise<AccountEntity> {
    const model = AccountMapper.toModel(entity);
    const result = await this.prismaService.account.create({
      data: model,
    });

    return AccountMapper.toEntity(result);
  }

  public async update(
    id: string,
    data: Partial<Omit<AccountEntity, 'id'>>,
  ): Promise<AccountEntity> {
    const updateData = AccountMapper.toModelUpdate(data);
    const result = await this.prismaService.account.update({
      where: { id },
      data: updateData,
    });
    return AccountMapper.toEntity(result);
  }

  public async findAll(
    params: AccountFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<AccountEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.account.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.account.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(AccountMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findByUserId(userId: string): Promise<AccountEntity | null> {
    const result = await this.prismaService.account.findUnique({
      where: {
        userId,
      },
    });

    if (!result) return null;

    return AccountMapper.toEntity(result);
  }

  private buildWhere(params: AccountFiltersValueObject) {
    const where: Prisma.AccountWhereInput = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    return where;
  }
}
import { SubscriptionRepository } from '../../../../../core/domain/repositories/shared/subscription.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import {
  SubscriptionFiltersValueObject
} from '../../../../../core/domain/value-objects/subscription/subscription-filters.value-object';
import { PaginationParamsValueObject } from '../../../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../../../core/domain/value-objects/shared/paginated-result.value-object';
import { SubscriptionEntity } from '../../../../../core/domain/entities/shared/subscription.entity';
import { Omit } from '@prisma/client/runtime/client';
import { SubscriptionMapper } from '../../mappers/shared/subscription.mapper';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionRepositoryImpl implements SubscriptionRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: SubscriptionEntity): Promise<SubscriptionEntity> {
    const model = SubscriptionMapper.toModel(entity);
    const result = await this.prismaService.subscription.create({
      data: model,
    });
    return SubscriptionMapper.toEntity(result);
  }

  public async update(
    id: string,
    data: Partial<Omit<SubscriptionEntity, 'id' | 'createdAt'>>,
  ): Promise<SubscriptionEntity> {
    const model = SubscriptionMapper.toModelUpdate(data);
    const result = await this.prismaService.subscription.update({
      where: {
        id,
      },
      data: model,
    });
    return SubscriptionMapper.toEntity(result);
  }

  public async findAll(
    params: SubscriptionFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<SubscriptionEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.subscription.findMany({
        where: where,
        take: pagination.take,
        skip: pagination.skip,
      }),
      this.prismaService.subscription.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(SubscriptionMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findByAccountId(
    accountId: string,
  ): Promise<SubscriptionEntity | null> {
    const result = await this.prismaService.subscription.findUnique({
      where: {
        accountId: accountId,
      },
    });

    if (!result) return null;

    return SubscriptionMapper.toEntity(result);
  }

  private buildWhere(params: SubscriptionFiltersValueObject) {
    const where: Prisma.SubscriptionWhereInput = {};

    if (params.startDate) {
      where.startDate = {
        gte: params.startDate,
      };
    }

    if (params.endDate) {
      where.endDate = {
        lte: params.endDate,
      };
    }

    if (params.autoRenew !== undefined) {
      where.autoRenew = params.autoRenew;
    }

    if (params.accountId) {
      where.accountId = params.accountId;
    }

    return where;
  }
}
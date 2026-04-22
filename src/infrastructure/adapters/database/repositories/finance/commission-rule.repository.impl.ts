import { Injectable } from '@nestjs/common';
import { CommissionRuleRepository } from '../../../../../core/domain/repositories/finance/commission-rule.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { CommissionRuleEntity } from 'src/core/domain/entities/finance/commission-rule.entity';
import { CommissionRuleFiltersValueObject } from 'src/core/domain/value-objects/commission-rule/commission-rule-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { CommissionRuleMapper } from '../../mappers/finance/commission-rule.mapper';
import { CommissionRuleWhereBuilder } from '../../builders/commission-rule-where.builder';

@Injectable()
export class CommissionRuleRepositoryImpl implements CommissionRuleRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(
    entity: CommissionRuleEntity,
  ): Promise<CommissionRuleEntity> {
    const model = CommissionRuleMapper.toModel(entity);
    const record = await this.prismaService.commissionRule.create({
      data: model,
    });

    return CommissionRuleMapper.toEntity(record);
  }
  public async update(
    id: string,
    data: Partial<Omit<CommissionRuleEntity, 'id'>>,
  ): Promise<CommissionRuleEntity> {
    const model = CommissionRuleMapper.toUpdateModel(data);
    const record = await this.prismaService.commissionRule.update({
      where: {
        id: id,
      },
      data: model,
    });
    return CommissionRuleMapper.toEntity(record);
  }
  public async findAll(
    params: CommissionRuleFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<CommissionRuleEntity>> {
    const where = CommissionRuleWhereBuilder.build(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.commissionRule.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.commissionRule.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(CommissionRuleMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findById(id: string): Promise<CommissionRuleEntity | null> {
    const record = await this.prismaService.commissionRule.findUnique({
      where: {
        id: id
      }
    })

    if (!record) return null;

    return CommissionRuleMapper.toEntity(record)
  }

  public async findActive(): Promise<CommissionRuleEntity[]> {
    const records = await this.prismaService.commissionRule.findMany({
      where: {
        isActive: true,
      }
    })
    return records.map(CommissionRuleMapper.toEntity);
  }
}
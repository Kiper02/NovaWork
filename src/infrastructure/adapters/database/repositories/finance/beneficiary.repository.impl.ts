import { Injectable } from '@nestjs/common';
import { BeneficiaryRepository } from '../../../../../core/domain/repositories/finance/beneficiary.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { BeneficiaryEntity } from 'src/core/domain/entities/finance/beneficiary.entity';
import { BeneficiaryFiltersValueObject } from 'src/core/domain/value-objects/beneficiary/beneficiary-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { BeneficiaryMapper } from '../../mappers/finance/beneficiary.mapper';
import { BeneficiaryWhereBuilder } from '../../builders/beneficiary-where.builder';

@Injectable()
export class BeneficiaryRepositoryImpl implements BeneficiaryRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: BeneficiaryEntity): Promise<BeneficiaryEntity> {
    const model = BeneficiaryMapper.toModel(entity);
    const record = await this.prismaService.beneficiary.create({data: model})
    return BeneficiaryMapper.toEntity(record)
  }
  public async update(
    entity: BeneficiaryEntity,
  ): Promise<BeneficiaryEntity> {
    const model = BeneficiaryMapper.toUpdateModel(entity);
    const record = await this.prismaService.beneficiary.update({
      where: {
        id: entity.id
      },
      data: model
    })

    return BeneficiaryMapper.toEntity(record);
  }
  public async findAll(
    params: BeneficiaryFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<BeneficiaryEntity>> {
    const where = BeneficiaryWhereBuilder.build(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.beneficiary.findMany({
        where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.beneficiary.count({where})
    ])

    return new PaginatedResultValueObject(
      data.map(BeneficiaryMapper.toEntity),
      total,
      pagination
    );
  }

  public async findById(id: string): Promise<BeneficiaryEntity | null> {
    const record = await this.prismaService.beneficiary.findUnique({where: {id}});
    if (!record) return null;
    return BeneficiaryMapper.toEntity(record)
  }
  public async findByAccountId(
    accountId: string,
  ): Promise<BeneficiaryEntity[]> {
    const records = await this.prismaService.beneficiary.findMany({
      where: { accountId },
    });

    return records.map(BeneficiaryMapper.toEntity);
  }

  public async remove(id: string): Promise<void> {
    await this.prismaService.beneficiary.delete({where: {id}})
  }
}
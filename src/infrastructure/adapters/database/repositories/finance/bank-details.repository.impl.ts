import { Injectable } from '@nestjs/common';
import { BankDetailsRepository } from '../../../../../core/domain/repositories/finance/bank-details.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { BankDetailsEntity } from 'src/core/domain/entities/finance/bank-details.entity';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { BankDetailsMapper } from '../../mappers/finance/bank-details.mapper';
import { BankDetailsBuilder } from '../../builders/bank-details.builder';
import {
  BankDetailsFiltersValueObject
} from '../../../../../core/domain/value-objects/bank-details/bank-details-filters.value.object';

@Injectable()
export class BankDetailsRepositoryImpl implements BankDetailsRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: BankDetailsEntity): Promise<BankDetailsEntity> {
    const model = BankDetailsMapper.toModel(entity);
    const record = await this.prismaService.bankDetails.create({ data: model });
    return BankDetailsMapper.toEntity(record);
  }
  public async update(
    id: string,
    data: Partial<Omit<BankDetailsEntity, 'id' | 'createdAt'>>,
  ): Promise<BankDetailsEntity> {
    const model = BankDetailsMapper.toUpdateModel(data);
    const record = await this.prismaService.bankDetails.update({
      where: {
        id: id,
      },
      data: model,
    });
    return BankDetailsMapper.toEntity(record);
  }
  public async findAll(
    params: BankDetailsFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<BankDetailsEntity>> {
    const where = BankDetailsBuilder.build(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.bankDetails.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.bankDetails.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(BankDetailsMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<BankDetailsEntity | null> {
    const record = await this.prismaService.bankDetails.findUnique({
      where: {
        id: id,
      },
    });
    if (!record) return null;
    return BankDetailsMapper.toEntity(record);
  }
  public async findByBeneficiaryId(
    beneficiaryId: string,
  ): Promise<BankDetailsEntity[] | null> {
    const records = await this.prismaService.bankDetails.findMany({
      where: {
        beneficiaryId: beneficiaryId,
      },
    });

    return records.map(BankDetailsMapper.toEntity);
  }

  public async findByUserId(userId: string): Promise<BankDetailsEntity[]> {
    const records = await this.prismaService.bankDetails.findMany({
      where: {
        beneficiary: {
          account: {
            userId: userId
          }
        }
      }
    })

    return records.map(BankDetailsMapper.toEntity);
  }
}
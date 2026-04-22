import { Injectable } from '@nestjs/common';
import { PaymentRepository } from '../../../../../core/domain/repositories/finance/payment.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { PaymentEntity } from 'src/core/domain/entities/finance/payment.entity';
import { PaymentFiltersValueObject } from 'src/core/domain/value-objects/payment/payment-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { PaymentMapper } from '../../mappers/finance/payment.mapper';
import { PaymentWhereBuilder } from '../../builders/payment-where.builder';

@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
  public constructor(private readonly prismaService: PrismaService) {}
  public async save(entity: PaymentEntity): Promise<PaymentEntity> {
    const model = PaymentMapper.toModel(entity);
    const record = await this.prismaService.payment.create({
      data: model
    })
    return PaymentMapper.toEntity(record);
  }
  public async update(
    id: string,
    data: Partial<Omit<PaymentEntity, 'id' | 'createdAt'>>,
  ): Promise<PaymentEntity> {
    const model = PaymentMapper.toUpdate(data);
    const record = await this.prismaService.payment.update({
      where: {
        id: id
      },
      data: model
    })
    return PaymentMapper.toEntity(record)
  }
  public async findAll(
    params: PaymentFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<PaymentEntity>> {
    const where = PaymentWhereBuilder.build(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.payment.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.payment.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(PaymentMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<PaymentEntity | null> {
    const record = await this.prismaService.payment.findUnique({
      where: {
        id: id
      }
    })

    if(!record) return null;

    return PaymentMapper.toEntity(record)
  }
  public async findByExternalId(
    externalId: string,
  ): Promise<PaymentEntity | null> {
    const record = await this.prismaService.payment.findUnique({
      where: {
        externalId: externalId,
      },
    });

    if (!record) return null;

    return PaymentMapper.toEntity(record);
  }
}
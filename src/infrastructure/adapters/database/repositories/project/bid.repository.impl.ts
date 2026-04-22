import { BidRepository } from '../../../../../core/domain/repositories/project/bid.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { BidFiltersValueObject } from '../../../../../core/domain/value-objects/bid/bid-filters.value.object';
import { PaginationParamsValueObject } from '../../../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../../../core/domain/value-objects/shared/paginated-result.value-object';
import { BidEntity } from '../../../../../core/domain/entities/project/bid.entity';
import { Omit } from '@prisma/client/runtime/client';
import { BidMapper } from '../../mappers/project/bid.mapper';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BidRepositoryImpl implements BidRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: BidEntity): Promise<BidEntity> {
    const model = BidMapper.toModel(entity);
    const record = await this.prismaService.bid.create({ data: model });
    return BidMapper.toEntity(record);
  }

  public async update(
    id: string,
    data: Partial<Omit<BidEntity, 'id' | 'createdAt'>>,
  ): Promise<BidEntity> {
    const model = BidMapper.toModelUpdate(data);
    const record = await this.prismaService.bid.update({
      where: {
        id: id,
      },
      data: model,
    });
    return BidMapper.toEntity(record);
  }

  public async findAll(
    params: BidFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<BidEntity>> {
    const where = this.buildWhere(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.bid.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.bid.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(BidMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findById(id: string): Promise<BidEntity | null> {
    const record = await this.prismaService.bid.findUnique({ where: { id } });
    if (!record) return null;
    return BidMapper.toEntity(record);
  }


  public async findByUserIdAndTaskId(userId: string, taskId: string): Promise<BidEntity | null> {
    const record = await this.prismaService.bid.findUnique({
      where: {
       userId_taskId: {
         userId: userId,
         taskId: taskId,
       }
      }
    })

    if(!record) return null;

    return BidMapper.toEntity(record)
  }

  private buildWhere(params: BidFiltersValueObject) {
    const where: Prisma.BidWhereInput = {};
    if(params.userId) {
      where.userId = params.userId;
    }

    if(params.taskId) {
      where.taskId = params.taskId;
    }

    if(params.amountStart) {
      where.amount = {
        gte: params.amountStart,
      }
    }

    if(params.amountEnd) {
      where.amount = {
        lte: params.amountEnd,
      }
    }

    if(params.createdAtStart) {
      where.createdAt = {
        gte: params.createdAtStart,
      }
    }

    if(params.createdAtEnd) {
      where.createdAt = {
        lte: params.createdAtEnd,
      }
    }

    return where;
  }
}
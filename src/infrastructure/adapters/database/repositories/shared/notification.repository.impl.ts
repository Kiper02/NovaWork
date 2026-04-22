import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { NotificationRepository } from '../../../../../core/domain/repositories/shared/notification.repository';
import { NotificationEntity } from 'src/core/domain/entities/shared/notification.entity';
import { NotificationFiltersValueObject } from 'src/core/domain/value-objects/notification/notification-filters.value.object';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { NotificationMapper } from '../../mappers/shared/notification.mapper';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotificationRepositoryImpl implements NotificationRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: NotificationEntity): Promise<NotificationEntity> {
    const model = NotificationMapper.toModel(entity);
    const record = await this.prismaService.notification.create({data: model})
    return NotificationMapper.toEntity(record);
  }
  public async update(
    id: string,
    data: Partial<Omit<NotificationEntity, 'id' | 'createdAt'>>,
  ): Promise<NotificationEntity> {
    const model = NotificationMapper.toUpdateModel(data);
    const record = await this.prismaService.notification.update({
      where: {
        id: id
      },
      data: model
    })
    return NotificationMapper.toEntity(record);
  }
  public async findAll(
    params: NotificationFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<NotificationEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.notification.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.notification.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(NotificationMapper.toEntity),
      total,
      pagination,
    );
  }
  public async findById(id: string): Promise<NotificationEntity | null> {
    const record = await this.prismaService.notification.findUnique({
      where: {
        id: id
      }
    })
    if(!record) return null;

    return NotificationMapper.toEntity(record)
  }

  private buildWhere(params: NotificationFiltersValueObject) {
    const where: Prisma.NotificationWhereInput = {}

    if(params.body) {
      where.body = {
        contains: params.body,
        mode: 'insensitive'
      }
    }

    if(params.createdAtStart) {
      where.createdAt = {
        gte: params.createdAtStart
      }
    }

    if(params.createdAtEnd) {
      where.createdAt = {
        lte: params.createdAtEnd
      }
    }

    return where;
  }
}
import { Injectable } from '@nestjs/common';
import { ServiceRepository } from '../../../../../core/domain/repositories/project/service.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { ServiceEntity } from 'src/core/domain/entities/project/service.entity';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { ServiceFiltersValueObject } from '../../../../../core/domain/value-objects/service/service-filters.value-object';
import { ServiceMapper } from '../../mappers/project/service.mapper';
import { Prisma } from '@prisma/client';
import { TaskFiltersValueObject } from '../../../../../core/domain/value-objects/task/task-filters.value-object';
import { CategoryMapper } from '../../mappers/chat/category.mapper';
import { ServiceAggregate } from '../../../../../core/domain/aggregates/service.aggregate';
import { ServiceWhereBuilder } from '../../builders/service-where.builder';


@Injectable()
export class ServiceRepositoryImpl implements ServiceRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: ServiceEntity): Promise<ServiceEntity | null> {
    return this.prismaService.$transaction(async (tx) => {
      const model = ServiceMapper.toModel(entity);
      const record = await this.prismaService.service.create({ data: model });

      if (entity.categoryIds.length) {
        await tx.serviceCategory.createMany({
          data: entity.categoryIds.map((categoryId) => ({
            serviceId: record.id,
            categoryId: categoryId,
          })),
          skipDuplicates: true,
        });
      }

      const service = await tx.service.findUnique({
        where: {
          id: record.id,
        },
        include: {
          serviceCategories: {
            include: {
              category: true,
            },
          },
        },
      });
      if (!service) return null;

      return ServiceMapper.toEntity(record);
    });
  }
  public async update(
    id: string,
    data: Partial<ServiceEntity>,
  ): Promise<ServiceEntity | null> {
    return this.prismaService.$transaction(async (tx) => {
      const model = ServiceMapper.toModelUpdate(data);
      const record = await this.prismaService.service.update({
        where: {
          id: id,
        },
        data: model,
        include: {
          serviceCategories: {
            include: {
              category: true,
            },
          },
        },
      });

      const currentServiceCategories = await tx.taskCategory.findMany({
        where: {
          taskId: record.id,
        },
        select: {
          categoryId: true,
        },
      });

      const currentIds = currentServiceCategories.map((tc) => tc.categoryId);
      const newIds = data.categoryIds ?? [];

      const toAdd = newIds?.filter((id) => !currentIds.includes(id)) ?? [];
      const toRemove = currentIds.filter((id) => !newIds.includes(id)) ?? [];

      if (toRemove.length) {
        await tx.serviceCategory.deleteMany({
          where: {
            serviceId: id,
            categoryId: {
              in: toRemove,
            },
          },
        });
      }

      if (toAdd.length) {
        await tx.serviceCategory.createMany({
          data: toAdd.map((categoryId) => ({
            serviceId: id,
            categoryId: categoryId,
          })),
          skipDuplicates: true,
        });
      }

      const updated = await tx.service.findUnique({
        where: { id },
        include: { serviceCategories: { include: { category: true } } },
      });
      if (!updated) return null;


      return ServiceMapper.toEntity(updated);
    });
  }
  public async findAll(
    params: ServiceFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ServiceEntity>> {
    const where = ServiceWhereBuilder.build(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.service.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
        include: {
          serviceCategories: {
            include: {
              category: true,
            },
          },
        },
      }),
      this.prismaService.service.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(ServiceMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findById(id: string): Promise<ServiceEntity | null> {
    const record = await this.prismaService.service.findUnique({
      where: {
        id: id,
      },
      include: {
        serviceCategories: {
          include: {
            category: true,
          },
        },
      },
    });
    if (!record) return null;

    return ServiceMapper.toEntity(record);
  }
}
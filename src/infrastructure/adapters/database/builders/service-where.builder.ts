import { Prisma } from '@prisma/client';
import { ServiceFiltersValueObject } from '../../../../core/domain/value-objects/service/service-filters.value-object';

export class ServiceWhereBuilder {
  public static build(params: ServiceFiltersValueObject) {
    const where: Prisma.ServiceWhereInput = {};

    if (params.title) {
      where.title = {
        contains: params.title,
        mode: 'insensitive',
      };
    }

    if (params.description) {
      where.description = {
        contains: params.description,
        mode: 'insensitive',
      };
    }

    if (params.isPublished) {
      where.isPublished = params.isPublished;
    }

    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.minPrice) {
      where.price = {
        gte: params.minPrice,
      };
    }

    if (params.maxPrice) {
      where.price = {
        lte: params.maxPrice,
      };
    }

    if (params.createdAtStart) {
      where.createdAt = {
        gte: params.createdAtStart,
      };
    }

    if (params.createdAtEnd) {
      where.createdAt = {
        lte: params.createdAtEnd,
      };
    }

    return where;
  }
}
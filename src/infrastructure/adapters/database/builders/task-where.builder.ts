import { TaskFiltersValueObject } from '../../../../core/domain/value-objects/task/task-filters.value-object';
import { Prisma } from '@prisma/client';

export class TaskWhereBuilder {
  public static build(params: TaskFiltersValueObject) {
    const where: Prisma.TaskWhereInput = {};

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

    if (params.minPrice) {
      where.minPrice = {
        gte: params.minPrice,
      };
    }

    if (params.maxPrice) {
      where.maxPrice = {
        lte: params.maxPrice,
      };
    }

    if (params.isPublished) {
      where.isPublished = params.isPublished;
    }

    if (params.notBids) {
      where.bids = { none: {} };
    }

    if (params.status) {
      where.status = params.status;
    }

    if (params.userId) {
      where.userId = params.userId;
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
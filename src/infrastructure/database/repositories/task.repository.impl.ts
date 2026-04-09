import { TaskRepository } from '../../../core/domain/repositories/task.repository';
import { PrismaService } from '../orm/prisma-recource/prisma.service';
import { TaskFiltersValueObject } from '../../../core/domain/value-objects/task/task-filters.value-object';
import { PaginationParamsValueObject } from '../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../core/domain/value-objects/shared/paginated-result.value-object';
import { TaskEntity } from '../../../core/domain/entities/task.entity';
import { Omit } from '@prisma/client/runtime/client';
import { TaskMapper } from '../mappers/task.mapper';
import type { Prisma } from '@prisma/client';

export class TaskRepositoryImpl implements TaskRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: TaskEntity): Promise<TaskEntity> {
    const model = TaskMapper.toModel(entity);
    const record = await this.prismaService.task.create({ data: model });
    return TaskMapper.toEntity(record)
  }

  public async update(
    id: string,
    data: Partial<Omit<TaskEntity, 'id' | 'createdAt'>>,
  ): Promise<TaskEntity> {
    const model = TaskMapper.toModelUpdate(data);
    const record = await this.prismaService.task.update({
      where: {
        id: id
      },
      data: model
    })
    return TaskMapper.toEntity(record)
  }

  public async findAll(
    params: TaskFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskEntity>> {
    const where = this.buildWhere(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.task.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
      }),
      this.prismaService.task.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(TaskMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findById(taskId: string): Promise<TaskEntity | null> {
    const record = await this.prismaService.task.findUnique({where: {id: taskId}});

    if(!record) return null;

    return TaskMapper.toEntity(record)
  }

  private buildWhere(params: TaskFiltersValueObject) {
    const where: Prisma.TaskWhereInput = {}

    if(params.title) {
      where.title = {
        contains: params.title,
        mode: 'insensitive'
      }
    }

    if(params.description) {
      where.description = {
        contains: params.description,
        mode: 'insensitive'
      }
    }

    if(params.minPrice) {
      where.minPrice = {
        gte: params.minPrice
      }
    }

    if(params.maxPrice) {
      where.maxPrice = {
        lte: params.maxPrice
      }
    }

    if(params.isPublished) {
      where.isPublished = params.isPublished;
    }

    if(params.notBids) {
      where.bids = {none: {}}
    }

    if(params.status) {
      where.status = params.status;
    }

    if(params.userId) {
      where.userId = params.userId;
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

    return where
  }
}
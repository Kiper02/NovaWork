import { TaskViewRepository } from '../../../../../core/domain/repositories/project/task-view.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { TaskViewFiltersValueObject } from '../../../../../core/domain/value-objects/task-view/task-view-filters.value-object';
import { PaginationParamsValueObject } from '../../../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../../../core/domain/value-objects/shared/paginated-result.value-object';
import { TaskViewEntity } from '../../../../../core/domain/entities/project/task-view.entity';
import { Omit } from '@prisma/client/runtime/client';
import { TaskViewMapper } from '../../mappers/project/task-view.mapper';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskViewRepositoryImpl implements TaskViewRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: TaskViewEntity): Promise<TaskViewEntity> {
    const model = TaskViewMapper.toModel(entity);
    const record = await this.prismaService.taskView.create({ data: model });
    return TaskViewMapper.toEntity(record);
  }

  public async update(
    id: string,
    data: Partial<Omit<TaskViewEntity, 'id' | 'createdAt'>>,
  ): Promise<TaskViewEntity> {
    const model = TaskViewMapper.toModelUpdate(data);
    const record = await this.prismaService.taskView.update({
      where: {
        id: id,
      },
      data: model,
    });
    return TaskViewMapper.toEntity(record);
  }

  public async findAll(
    params: TaskViewFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskViewEntity>> {
    const where = this.buildWhere(params);
    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.taskView.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
        orderBy: {
          viewedAt: 'desc',
        },
      }),
      this.prismaService.taskView.count({ where: where }),
    ]);

    return new PaginatedResultValueObject(
      data.map(TaskViewMapper.toEntity),
      total,
      pagination,
    );
  }

  public async findById(id: string): Promise<TaskViewEntity | null> {
    const record = await this.prismaService.taskView.findUnique({
      where: { id },
    });
    if (!record) return null;
    return TaskViewMapper.toEntity(record);
  }

  public async findByUserIdAndTaskId(
    userId: string,
    taskId: string,
  ): Promise<TaskViewEntity | null> {
    const record = await this.prismaService.taskView.findUnique({
      where: {
        userId_taskId: {
          userId: userId,
          taskId: taskId,
        },
      },
    });

    if (!record) return null;

    return TaskViewMapper.toEntity(record);
  }

  public async countByTaskId(taskId: string): Promise<number> {
    return this.prismaService.taskView.count({
      where: {
        taskId: taskId,
      },
    });
  }

  private buildWhere(params: TaskViewFiltersValueObject) {
    const where: Prisma.TaskViewWhereInput = {};

    if (params.userId) {
      where.userId = params.userId;
    }

    if (params.taskId) {
      where.taskId = params.taskId;
    }

    return where;
  }
}

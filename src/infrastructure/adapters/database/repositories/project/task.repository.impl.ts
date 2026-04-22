import { TaskRepository } from '../../../../../core/domain/repositories/project/task.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { TaskFiltersValueObject } from '../../../../../core/domain/value-objects/task/task-filters.value-object';
import { PaginationParamsValueObject } from '../../../../../core/domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../../../core/domain/value-objects/shared/paginated-result.value-object';
import { TaskEntity } from '../../../../../core/domain/entities/project/task.entity';
import { Omit } from '@prisma/client/runtime/client';
import { TaskMapper } from '../../mappers/project/task.mapper';
import { Injectable } from '@nestjs/common';
import { TaskWhereBuilder } from '../../builders/task-where.builder';

@Injectable()
export class TaskRepositoryImpl implements TaskRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async save(entity: TaskEntity): Promise<TaskEntity | null> {
    return this.prismaService.$transaction(async (tx) => {
      const model = TaskMapper.toModel(entity);
      const record = await tx.task.create({ data: model });

      if (entity.categoryIds.length) {
        await tx.taskCategory.createMany({
          data: entity.categoryIds.map((categoryId) => ({
            taskId: record.id,
            categoryId: categoryId,
          })),
          skipDuplicates: true,
        });
      }

      const task = await tx.task.findUnique({
        where: {
          id: record.id,
        },
        include: {
          taskCategories: {
            include: {
              category: true,
            },
          },
        },
      });
      if (!task) return null;

      return TaskMapper.toEntity(task);
    });
  }

  public async update(
    id: string,
    data: Partial<Omit<TaskEntity, 'id' | 'createdAt'>>,
  ): Promise<TaskEntity | null> {
    return this.prismaService.$transaction(async tx => {
      const model = TaskMapper.toModelUpdate(data);
      const record = await tx.task.update({
        where: {
          id: id,
        },
        data: model,
        include: {
          taskCategories: {
            include: {
              category: true,
            },
          },
        },
      });

      const currentTaskCategories = await tx.taskCategory.findMany({
        where: {
          taskId: record.id
        },
        select: {
          categoryId: true
        }
      })

      const currentIds = currentTaskCategories.map(tc => tc.categoryId);
      const newIds = data.categoryIds ?? [];

      const toAdd = newIds?.filter((id) => !currentIds.includes(id)) ?? [];
      const toRemove = currentIds.filter((id) => !newIds.includes(id)) ?? [];

      if(toRemove.length) {
        await tx.taskCategory.deleteMany({
          where: {
            taskId: id,
            categoryId: {
              in: toRemove
            }
          }
        })
      }

      if(toAdd.length) {
        await tx.taskCategory.createMany({
          data: toAdd.map(categoryId => ({taskId: id, categoryId: categoryId})),
          skipDuplicates: true
        })
      }

      const updated = await tx.task.findUnique({
        where: { id },
        include: { taskCategories: { include: { category: true } } },
      });
      if (!updated) return null

      return TaskMapper.toEntity(updated);
    })
  }

  public async findAll(
    params: TaskFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskEntity>> {
    const where = TaskWhereBuilder.build(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.task.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
        include: {
          taskCategories: {
            include: {
              category: true,
            },
          },
        },
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
    const record = await this.prismaService.task.findUnique({
      where: { id: taskId },
      include: {
        taskCategories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!record) return null;

    return TaskMapper.toEntity(record);
  }
}
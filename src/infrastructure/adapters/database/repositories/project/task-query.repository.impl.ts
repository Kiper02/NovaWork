import { Injectable } from '@nestjs/common';
import { TaskQueryRepository } from '../../../../../core/domain/repositories/project/task-query.repository';
import { PrismaService } from '../../orm/prisma-recource/prisma.service';
import { TaskAggregate } from 'src/core/domain/aggregates/task.aggregate';
import { PaginatedResultValueObject } from 'src/core/domain/value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from 'src/core/domain/value-objects/shared/pagination-params.value-object';
import { TaskFiltersValueObject } from 'src/core/domain/value-objects/task/task-filters.value-object';
import { TaskMapper } from '../../mappers/project/task.mapper';
import { CategoryMapper } from '../../mappers/chat/category.mapper';
import { TaskWhereBuilder } from '../../builders/task-where.builder';
import { UserMapper } from '../../mappers/user/user.mapper';
import { ProfileEntity } from '../../../../../core/domain/entities/user/profile.entity';
import { use } from 'react';
import { ProfileMapper } from '../../mappers/user/profile.mapper';
import { UserAggregate } from '../../../../../core/domain/aggregates/user.aggregate';
import { resolveRuntimeExtensions } from '@aws-sdk/client-s3/dist-types/runtimeExtensions';

@Injectable()
export class TaskQueryRepositoryImpl implements TaskQueryRepository {
  public constructor(private readonly prismaService: PrismaService) {}
  public async findAllForDetails(
    params: TaskFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TaskAggregate>> {
    const where = TaskWhereBuilder.build(params);

    const [data, total] = await this.prismaService.$transaction([
      this.prismaService.task.findMany({
        where: where,
        skip: pagination.skip,
        take: pagination.take,
        include: {
          taskCategories: {
            include: {
              category: {
                include: {
                  children: true,
                },
              },
            },
          },
          user: {
            include: {
              profile: true,
            }
          }
        },
      }),
      this.prismaService.task.count({ where: where }),
    ]);

    const aggregate: TaskAggregate[] = data.map((task) => {
      const taskEntity = TaskMapper.toEntity(task);
      const categoriesEntities = task.taskCategories.map((taskCategory) =>
        CategoryMapper.toEntity(taskCategory.category),
      );
      const user = UserMapper.toEntity(task.user)
      let profile: ProfileEntity | null = null

      if(task.user.profile) {
        profile = ProfileMapper.toEntity(task.user.profile)
      }

      const userAggregate = new UserAggregate(user, profile, null, null)

      return {
        task: taskEntity,
        categories: categoriesEntities,
        creator: userAggregate
      };
    });

    return new PaginatedResultValueObject(aggregate, total, pagination);
  }

  public async findByIdForDetails(
    taskId: string,
  ): Promise<TaskAggregate | null> {
    const record = await this.prismaService.task.findUnique({
      where: { id: taskId },
      include: {
        taskCategories: {
          include: {
            category: {
              include: {
                children: true,
              },
            },
          },
        },
        user: {
          include: {
            profile: true
          }
        }
      },
    });

    if (!record) return null;

    const task = TaskMapper.toEntity(record);
    const categories = record.taskCategories.map((taskCategory) =>
      CategoryMapper.toEntity(taskCategory.category),
    );
    const user = UserMapper.toEntity(record.user)

    let profile: ProfileEntity | null = null;

    if (record.user.profile) {
      profile = ProfileMapper.toEntity(record.user.profile);
    }

    const userAggregate = new UserAggregate(user, profile, null, null);


    return new TaskAggregate(task, categories, userAggregate);
  }
}
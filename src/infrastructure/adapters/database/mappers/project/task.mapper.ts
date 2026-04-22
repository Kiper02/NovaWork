import { Category, Prisma, Task, TaskCategory } from '@prisma/client';
import {
  type EnumTaskStatus,
  TaskEntity,
} from '../../../../../core/domain/entities/project/task.entity';

type TaskWithCategories =
  | (Task & {
      taskCategories?: (TaskCategory & { category?: Category })[];
    });

export class TaskMapper {
  public static toEntity(model: TaskWithCategories): TaskEntity {
    const categoryIds =
      (model.taskCategories
        ?.map((taskCategory) => taskCategory.category?.id)
        .filter(Boolean) as string[]) ?? [];

    return new TaskEntity(
      model.id,
      model.title,
      model.description,
      model.minPrice.toNumber(),
      model.maxPrice.toNumber(),
      model.status as EnumTaskStatus,
      model.isPublished,
      model.userId,
      categoryIds ?? [],
      model.createdAt,
      model.updatedAt,
      model.workspaceId,
      model.projectId
    )
  }

  public static toModel(entity: TaskEntity): Task {
    return {
      id: entity.id,
      userId: entity.userId,
      title: entity.title,
      description: entity.description,
      minPrice: Prisma.Decimal(entity.minPrice),
      maxPrice: Prisma.Decimal(entity.maxPrice),
      isPublished: entity.isPublished,
      status: entity.status as EnumTaskStatus,
      workspaceId: entity.workspaceId,
      projectId: entity.projectId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<TaskEntity, 'id' | 'createdAt'>>,
  ): Prisma.TaskUpdateInput {
    const result: Prisma.TaskUpdateInput = {};

    if(data.title) result.title = data.title;
    if(data.description) result.description = data.description;
    if(data.minPrice) result.minPrice = data.minPrice;
    if(data.maxPrice) result.maxPrice = data.maxPrice;
    if(data.status) result.status = data.status;
    if(data.isPublished) result.isPublished = data.isPublished;
    if(data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}

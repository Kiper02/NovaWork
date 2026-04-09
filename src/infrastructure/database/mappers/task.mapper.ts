import { Prisma, Task } from '@prisma/client';
import {
  type EnumTaskStatus,
  TaskEntity,
} from '../../../core/domain/entities/task.entity';

export class TaskMapper {
  public static toEntity(model: Task): TaskEntity {
    return {
      id: model.id,
      userId: model.userId,
      title: model.title,
      description: model.description,
      minPrice: model.minPrice.toNumber(),
      maxPrice: model.maxPrice.toNumber(),
      isPublished: model.isPublished,
      status: model.status as EnumTaskStatus,
      workspaceId: model.workspaceId,
      projectId: model.projectId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
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

import { type TaskView, Prisma } from '@prisma/client';
import { TaskViewEntity } from '../../../../../core/domain/entities/project/task-view.entity';

export class TaskViewMapper {
  public static toEntity(model: TaskView): TaskViewEntity {
    return new TaskViewEntity(
      model.id,
      model.userId,
      model.taskId,
      model.viewedAt,
      model.createdAt,
      model.updatedAt,
    );
  }

  public static toModel(entity: TaskViewEntity): Prisma.TaskViewCreateInput {
    return {
      id: entity.id,
      user: {
        connect: {
          id: entity.userId,
        },
      },
      task: {
        connect: {
          id: entity.taskId,
        },
      },
      viewedAt: entity.viewedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<TaskViewEntity, 'id' | 'createdAt'>>,
  ): Prisma.TaskViewUpdateInput {
    const result: Prisma.TaskViewUpdateInput = {};

    if (data.viewedAt !== undefined) result.viewedAt = data.viewedAt;
    if (data.updatedAt !== undefined) result.updatedAt = data.updatedAt;

    return result;
  }
}

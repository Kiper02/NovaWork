import { CreateTaskViewDto } from '../dto/task-view/create-task-view.dto';
import { TaskViewEntity } from '../../core/domain/entities/project/task-view.entity';
import { TaskViewResponseDto } from '../dto/task-view/task-view-response.dto';
import { ICreateTaskViewCommand } from '../../core/use-cases/task-view/create/create-task-view.command';
import { FindAllTaskViewQueryDto } from '../dto/task-view/find-all-task-view-query.dto';
import { IFindAllTaskViewCommand } from '../../core/use-cases/task-view/find-all/find-all-task-view.command';

export class TaskViewMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateTaskViewDto,
  ): ICreateTaskViewCommand {
    return {
      userId: userId,
      taskId: dto.taskId,
    };
  }

  public static toFindAllCommand(
    dto: FindAllTaskViewQueryDto,
  ): IFindAllTaskViewCommand {
    return {
      taskId: dto.taskId,
      userId: dto.userId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toResponse(entity: TaskViewEntity): TaskViewResponseDto {
    return {
      id: entity.id,
      userId: entity.userId,
      taskId: entity.taskId,
      viewedAt: entity.viewedAt,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

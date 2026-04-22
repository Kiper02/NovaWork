import { CreateTaskDto } from '../dto/task/create-task.dto';
import { ICreateTaskCommand } from '../../core/use-cases/task/create/create-task.command';
import { UpdateTaskDto } from '../dto/task/update-task.dto';
import { ITaskUpdateCommand } from '../../core/use-cases/task/update/task-update.command';
import { FindAllTaskQueryDto } from '../dto/task/find-all-task-query.dto';
import { IFindAllTaskCommand } from '../../core/use-cases/task/find-all/find-all-task.command';
import { TaskResponseDto } from '../dto/task/task-response.dto';
import { TaskEntity } from '../../core/domain/entities/project/task.entity';
import { IFindTaskByIdCommand } from '../../core/use-cases/task/find-by-id/find-task-by-id.command';
import { TaskAggregate } from '../../core/domain/aggregates/task.aggregate';
import { CategoryMapper } from './category.mapper';
import { UserMapper } from './user.mapper';
import { TaskResponseForDetailsDto } from '../dto/task/task-response-for-details.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';
import { ProfileResponseDto } from '../dto/profile/profile-response.dto';
import { ProfileMapper } from './profile.mapper';

export class TaskMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateTaskDto,
  ): ICreateTaskCommand {
    return {
      title: dto.title,
      description: dto.description,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      status: dto.status,
      isPublished: dto.isPublished,
      userId: userId,
      categoryIds: dto.categoryIds,
      projectId: dto.projectId,
    };
  }

  public static toUpdateCommand(
    id: string,
    userId: string,
    dto: UpdateTaskDto,
  ): ITaskUpdateCommand {
    return {
      id: id,
      title: dto.title,
      description: dto.description,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      status: dto.status,
      categoryIds: dto.categoryIds,
      isPublished: dto.isPublished,
      userId: userId,
    };
  }

  public static toFindAllCommand(
    dto: FindAllTaskQueryDto,
  ): IFindAllTaskCommand {
    return {
      title: dto.title,
      description: dto.description,
      isPublished: dto.isPublished,
      minPrice: dto.minPrice,
      maxPrice: dto.maxPrice,
      notBids: dto.notBids,
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      status: dto.status,
      userId: dto.userId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindByIdCommand(taskId: string): IFindTaskByIdCommand {
    return {
      taskId: taskId,
    };
  }

  public static async toResponseForDetails(
    aggregate: TaskAggregate,
    storage: StoragePort,
  ): Promise<TaskResponseForDetailsDto> {
    const { task, categories, creator } = aggregate;

    const categoriesResponse = categories.map(CategoryMapper.toResponse);
    const { user, profile } = creator;

    let profileResponse: ProfileResponseDto | null = null;

    if (profile) {
      profileResponse = await ProfileMapper.toResponse(profile, storage);
    }

    const userResponse = UserMapper.toResponse(user);

    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isPublished: task.isPublished,
      minPrice: task.minPrice,
      maxPrice: task.maxPrice,
      status: task.status,
      user: {
        ...userResponse,
        profile: profileResponse
      },
      projectId: task.projectId,
      workspaceId: task.workspaceId,
      categories: categoriesResponse,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  public static toResponse(entity: TaskEntity): TaskResponseDto {
    return {
      id: entity.id,
      title: entity.title,
      description: entity.description,
      isPublished: entity.isPublished,
      minPrice: entity.minPrice,
      maxPrice: entity.maxPrice,
      status: entity.status,
      userId: entity.userId,
      projectId: entity.projectId,
      workspaceId: entity.workspaceId,
      categoryIds: entity.categoryIds,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
import { CreateWorkspaceDto } from '../dto/workspace/create-workspace.dto';
import { WorkspaceEntity } from '../../core/domain/entities/project/workspace.entity';
import { WorkspaceResponseDto } from '../dto/workspace/workspace-response.dto';
import { FindAllWorkspaceQueryDto } from '../dto/workspace/find-all-workspace-query.dto';
import { BaseQueryDto } from '../dto/shared/base-query.dto';
import { IFindAllWorkspaceCommand } from '../../core/use-cases/workspace/find-all-workspace/find-all-workspace.command';
import { IFindMyWorkspaceCommand } from '../../core/use-cases/workspace/find-my-workspace/find-my-workspace.command';
import { ICreateWorkspaceCommand } from '../../core/use-cases/workspace/create-workspace/create-workspace.command';

export class WorkspaceMapper {
  public static toCreateCommand(
    dto: CreateWorkspaceDto,
    userId: string,
  ): ICreateWorkspaceCommand {
    return {
      name: dto.name,
      userId: userId,
    };
  }

  public static toFindAllCommand(
    dto: FindAllWorkspaceQueryDto,
  ): IFindAllWorkspaceCommand {
    return {
      name: dto.name,
      userId: dto.userId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindMyCommand(
    dto: BaseQueryDto,
    userId: string,
  ): IFindMyWorkspaceCommand {
    return {
      userId: userId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toResponse(entity: WorkspaceEntity): WorkspaceResponseDto {
    return {
      id: entity.id,
      name: entity.name,
      isDefault: entity.isDefault,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

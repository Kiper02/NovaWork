import { Workspace } from '@prisma/client';
import { WorkspaceEntity } from '../../../../../core/domain/entities/project/workspace.entity';

export class WorkspaceMapper {
  public static toEntity(model: Workspace): WorkspaceEntity {
    return {
      id: model.id,
      name: model.name,
      userId: model.userId,
      isDefault: model.isDefault,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toModel(entity: WorkspaceEntity): Workspace {
    return {
      id: entity.id,
      name: entity.name,
      userId: entity.userId,
      isDefault: entity.isDefault,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

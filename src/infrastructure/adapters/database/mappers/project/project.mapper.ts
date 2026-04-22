import { type Prisma, Project } from '@prisma/client';
import { ProjectEntity } from '../../../../../core/domain/entities/project/project.entity';

export class ProjectMapper {
  public static toEntity(model: Project): ProjectEntity {
    return {
      id: model.id,
      userId: model.userId,
      title: model.title,
      picture: model.picture,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toModel(entity: ProjectEntity): Project {
    return {
      id: entity.id,
      userId: entity.userId,
      title: entity.title,
      picture: entity.picture ?? null,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<ProjectEntity, 'id' | 'createdAt'>>,
  ): Prisma.ProjectUpdateInput {
    const result: Prisma.ProjectUpdateInput = {};

    if(data.title) result.title = data.title;
    if(data.picture) result.picture = data.picture;
    if(data.updatedAt) result.updatedAt = data.updatedAt;

    return result;
  }
}
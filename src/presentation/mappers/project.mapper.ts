import { CreateProjectDto } from '../dto/project/create-project.dto';
import { ICreateProjectCommand } from '../../core/use-cases/project/create/create-project.command';
import { UpdateProjectDto } from '../dto/project/update-project.dto';
import { IUpdateProjectCommand } from '../../core/use-cases/project/update/update-project.command';
import { FindAllProjectQueryDto } from '../dto/project/find-all-project-query.dto';
import { IFindAllProjectsCommand } from '../../core/use-cases/project/find-all/find-all-projects.command';
import { IFindByIdProjectCommand } from '../../core/use-cases/project/find-by-id/find-by-id-project.command';
import { ProjectEntity } from '../../core/domain/entities/project/project.entity';
import { ProjectResponseDto } from '../dto/project/project-response.dto';
import { FindMyProjectQueryDto } from '../dto/project/find-my-project-query.dto';
import { StoragePort } from '../../core/ports/storage/storage.port';

export class ProjectMapper {
  public static toCreateCommand(
    userId: string,
    dto: CreateProjectDto,
    picture?: Express.Multer.File,
  ): ICreateProjectCommand {
    return {
      title: dto.title,
      picture: picture?.buffer,
      userId: userId,
    };
  }

  public static toUpdateCommand(
    id: string,
    userId: string,
    dto: UpdateProjectDto,
    picture?: Express.Multer.File,
  ): IUpdateProjectCommand {
    return {
      id: id,
      title: dto.title,
      picture: picture?.buffer,
      userId: userId,
    };
  }

  public static toFindAllCommand(
    dto: FindAllProjectQueryDto,
  ): IFindAllProjectsCommand {
    return {
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      userId: dto.userId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindMyCommand(userId: string, dto: FindMyProjectQueryDto) {
    return {
      createdAtStart: dto.createdAtStart,
      createdAtEnd: dto.createdAtEnd,
      userId: userId,
      page: dto.page,
      limit: dto.limit,
    };
  }

  public static toFindByIdCommand(
    userId: string,
    projectId: string,
  ): IFindByIdProjectCommand {
    return {
      userId: userId,
      projectId: projectId,
    };
  }

  public static async toResponse(
    entity: ProjectEntity,
    storage: StoragePort,
  ): Promise<ProjectResponseDto> {

    let picture: string | null = null;

    if(entity.picture) {
      picture = await storage.get(entity.picture)
    }

    return {
      id: entity.id,
      title: entity.title,
      picture: picture,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}

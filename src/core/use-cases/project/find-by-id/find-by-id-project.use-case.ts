import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project/project.repository';
import { IFindByIdProjectCommand } from './find-by-id-project.command';
import { ProjectNotFoundException } from '../../../domain/exceptions/project/project-not-found.exception';

@Injectable()
export class FindByIdProjectUseCase {
  public constructor(private readonly projectRepository: ProjectRepository) {}

  public async execute(command: IFindByIdProjectCommand) {
    // TODO:
    //  - Реализовать permission сервис, который будет по roleId проверять разрешения
    //  - Реализовать репозиторий участников проекта
    //  - Здесь проверять, что пользователь является либо участником проекта, либо имеет административную роль

    const project = await this.projectRepository.findById(command.projectId);
    if (!project) {
      throw new ProjectNotFoundException();
    }

    return project;
  }
}
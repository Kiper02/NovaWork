import { Injectable } from '@nestjs/common';
import { ProjectRepository } from '../../../domain/repositories/project/project.repository';
import { IFindAllProjectsCommand } from './find-all-projects.command';
import { ProjectFiltersValueObject } from '../../../domain/value-objects/project/project-filters.value.object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllProjectUseCase {
  public constructor(
    private readonly projectRepository: ProjectRepository
  ) {
  }

  public async execute(command: IFindAllProjectsCommand) {
    const params = new ProjectFiltersValueObject(command.userId, command.createdAtStart, command.createdAtEnd);
    const pagination = new PaginationParamsValueObject(command.page, command.limit);

    return this.projectRepository.findAll(params, pagination);
  }
}
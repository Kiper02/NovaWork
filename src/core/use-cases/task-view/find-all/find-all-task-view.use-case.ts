import { TaskViewRepository } from '../../../domain/repositories/project/task-view.repository';
import { IFindAllTaskViewCommand } from './find-all-task-view.command';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { TaskViewFiltersValueObject } from '../../../domain/value-objects/task-view/task-view-filters.value-object';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllTaskViewUseCase {
  public constructor(public readonly taskViewRepository: TaskViewRepository) {}

  public async execute(command: IFindAllTaskViewCommand) {
    const paginationParams = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );
    const filters = new TaskViewFiltersValueObject(
      command.userId,
      command.taskId,
    );

    return this.taskViewRepository.findAll(filters, paginationParams);
  }
}

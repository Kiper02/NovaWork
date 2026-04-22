import { Injectable } from '@nestjs/common';
import { TaskFiltersValueObject } from '../../../domain/value-objects/task/task-filters.value-object';
import { IFindAllTaskCommand } from './find-all-task.command';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { TaskQueryRepository } from '../../../domain/repositories/project/task-query.repository';


@Injectable()
export class FindAllTaskUseCase {
  public constructor(
    private readonly taskQueryRepository: TaskQueryRepository,
  ) {}

  public async execute(command: IFindAllTaskCommand) {
    const params = new TaskFiltersValueObject(
      command.userId,
      command.title,
      command.description,
      command.isPublished,
      command.minPrice,
      command.maxPrice,
      command.notBids,
      command.createdAtStart,
      command.createdAtEnd,
      command.status,
    );

    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );

    return this.taskQueryRepository.findAllForDetails(params, pagination);
  }
}
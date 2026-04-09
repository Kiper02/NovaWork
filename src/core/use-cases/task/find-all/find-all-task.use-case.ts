import { Injectable } from '@nestjs/common';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import { TaskFiltersValueObject } from '../../../domain/value-objects/task/task-filters.value-object';
import { IFindAllTaskCommand } from './find-all-task.command';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../domain/value-objects/shared/paginated-result.value-object';


@Injectable()
export class FindAllTaskUseCase {
  public constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(command: IFindAllTaskCommand): Promise<PaginatedResultValueObject<TaskEntity>> {
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
      command.status
    )

    const pagination = new PaginationParamsValueObject(command.page, command.limit)

    return this.taskRepository.findAll(params, pagination);
  }
}
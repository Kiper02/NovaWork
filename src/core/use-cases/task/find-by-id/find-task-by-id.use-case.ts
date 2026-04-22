import { Injectable } from '@nestjs/common';
import { IFindTaskByIdCommand } from './find-task-by-id.command';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';
import { TaskQueryRepository } from '../../../domain/repositories/project/task-query.repository';

@Injectable()
export class FindTaskByIdUseCase {
  public constructor(
    private readonly taskQueryRepository: TaskQueryRepository,
  ) {}

  public async execute(command: IFindTaskByIdCommand) {
    const task = await this.taskQueryRepository.findByIdForDetails(
      command.taskId,
    );
    if (!task) {
      throw new TaskNotFoundException();
    }

    return task;
  }
}
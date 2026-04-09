import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import { IFindTaskByIdCommand } from './find-task-by-id.command';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';

@Injectable()
export class FindTaskByIdUseCase {
  public constructor(
    private readonly taskRepository: TaskRepository,
  ) {}

  public async execute(command: IFindTaskByIdCommand) {
    const task = await this.taskRepository.findById(command.taskId);
    if(!task) {
      throw new TaskNotFoundException()
    }

    return task;
  }
}
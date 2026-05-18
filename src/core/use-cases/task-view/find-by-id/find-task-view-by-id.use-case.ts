import { TaskViewRepository } from '../../../domain/repositories/project/task-view.repository';
import { IFindTaskViewByIdCommand } from './find-task-view-by-id.command';
import { TaskViewNotFoundException } from '../../../domain/exceptions/task-view/task-view-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindTaskViewByIdUseCase {
  public constructor(public readonly taskViewRepository: TaskViewRepository) {}

  public async execute(command: IFindTaskViewByIdCommand) {
    const taskView = await this.taskViewRepository.findById(command.id);

    if (!taskView) {
      throw new TaskViewNotFoundException();
    }

    return taskView;
  }
}

import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/repositories/project/task.repository';
import { ITaskUpdateCommand } from './task-update.command';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';
import { TaskUpdateForbiddenException } from '../../../domain/exceptions/task/task-update-forbidden.exception';
import { AccessControlService } from '../../../domain/services/authorization/access-control.service';
import { UpdateTaskException } from '../../../domain/exceptions/task/update-task.exception';

@Injectable()
export class TaskUpdateUseCase {
  public constructor(
    private readonly taskRepository: TaskRepository,
    private readonly accessControlService: AccessControlService
  ) {}

  public async execute(command: ITaskUpdateCommand) {
    const task = await this.taskRepository.findById(command.id);
    if(!task) {
      throw new TaskNotFoundException();
    }

    await this.accessControlService.checkAccessOrThrow(
      command.userId,
      ['super_admin', 'admin', 'moderator'],
      task.userId,
      new TaskUpdateForbiddenException(),
    );

    const taskUpdate = await this.taskRepository.update(command.id, command)

    if (!taskUpdate) {
      throw new UpdateTaskException();
    }
    return taskUpdate;
  }
}
import { Injectable } from '@nestjs/common';
import { TaskRepository } from '../../../domain/repositories/task.repository';
import { ITaskUpdateCommand } from './task-update.command';
import { GlobalRoleRepository } from '../../../domain/repositories/global-role.repository';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';
import { TaskUpdateForbiddenException } from '../../../domain/exceptions/task/task-update-forbidden.exception';

@Injectable()
export class TaskUpdateUseCase {
  public constructor(
    private readonly taskRepository: TaskRepository,
    private readonly globalRoleRepository: GlobalRoleRepository
  ) {}

  public async execute(command: ITaskUpdateCommand) {
    const task = await this.taskRepository.findById(command.id);
    if(!task) {
      throw new TaskNotFoundException()
    }
    const accessRoles = ['super_admin', 'admin', 'moderator']
    let access = task.userId === command.userId;

    const roles = await this.globalRoleRepository.findUserRoles(command.userId);
    const currentRoles = roles.map((role) => role.name);
    if(!access) {
      access = accessRoles.some(role => currentRoles.includes(role))
    }

    if(!access) {
      throw new TaskUpdateForbiddenException()
    }

    return this.taskRepository.update(command.id, command)
  }
}
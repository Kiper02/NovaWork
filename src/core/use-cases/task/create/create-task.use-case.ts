import { TaskRepository } from '../../../domain/repositories/task.repository';
import { ICreateTaskCommand } from './create-task.command';
import {
  EnumTaskStatus,
  TaskEntity,
} from '../../../domain/entities/task.entity';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../../domain/repositories/workspace.repository';

@Injectable()
export class CreateTaskUseCase {
  public constructor(
    private readonly taskRepository: TaskRepository,
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  public async execute(command: ICreateTaskCommand) {
    let workspaceId: string | null = null;

    if (!command.workspaceId) {
      const defaultWorkspace =
        await this.workspaceRepository.findDefaultUserWorkspace(command.userId);
      workspaceId = defaultWorkspace!.id;
    }

    const taskEntity = new TaskEntity(
      uuid(),
      command.title,
      command.description,
      command.minPrice,
      command.maxPrice,
      command.status || EnumTaskStatus.NOT_DISTRIBUTED,
      command.isPublished || true,
      command.userId,
      new Date(),
      new Date(),
      workspaceId!,
      command.projectId ?? null,
    );

    return this.taskRepository.save(taskEntity);
  }
}
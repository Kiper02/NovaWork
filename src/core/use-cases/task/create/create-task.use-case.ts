import { TaskRepository } from '../../../domain/repositories/project/task.repository';
import { ICreateTaskCommand } from './create-task.command';
import {
  EnumTaskStatus,
  TaskEntity,
} from '../../../domain/entities/project/task.entity';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../../domain/repositories/project/workspace.repository';
import { UpdateTaskException } from '../../../domain/exceptions/task/update-task.exception';
import { TaskInvalidPriceRangeException } from '../../../domain/exceptions/task/task-invalid-price-range.exception';

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

    if(command.maxPrice < command.minPrice) {
      throw new TaskInvalidPriceRangeException()
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
      command.categoryIds ?? [],
      new Date(),
      new Date(),
      workspaceId!,
      command.projectId ?? null,
    );

    const task = await this.taskRepository.save(taskEntity);

    if(!task) {
      throw new UpdateTaskException()
    }

    return task;
  }
}
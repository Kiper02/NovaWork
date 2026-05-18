import { v4 as uuid } from 'uuid';
import { ICreateTaskViewCommand } from './create-task-view.command';
import { TaskViewEntity } from '../../../domain/entities/project/task-view.entity';
import { TaskViewRepository } from '../../../domain/repositories/project/task-view.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTaskViewUseCase {
  public constructor(public readonly taskViewRepository: TaskViewRepository) {}

  public async execute(command: ICreateTaskViewCommand) {
    // Check if view already exists
    const existingView = await this.taskViewRepository.findByUserIdAndTaskId(
      command.userId,
      command.taskId,
    );

    if (existingView) {
      // Update the viewed time if already exists
      return this.taskViewRepository.update(existingView.id, {
        viewedAt: new Date(),
        updatedAt: new Date(),
      });
    }

    // Create new view
    const taskViewEntity = new TaskViewEntity(
      uuid(),
      command.userId,
      command.taskId,
      new Date(),
      new Date(),
      new Date(),
    );

    return this.taskViewRepository.save(taskViewEntity);
  }
}

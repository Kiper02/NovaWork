import { Module } from '@nestjs/common';
import { TasksController } from '../../presentation/controllers/tasks.controller';
import { CreateTaskUseCase } from '../../core/use-cases/task/create/create-task.use-case';
import { FindAllTaskUseCase } from '../../core/use-cases/task/find-all/find-all-task.use-case';
import { FindTaskByIdUseCase } from '../../core/use-cases/task/find-by-id/find-task-by-id.use-case';
import { TaskUpdateUseCase } from '../../core/use-cases/task/update/task-update.use-case';


@Module({
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    TaskUpdateUseCase,
    FindAllTaskUseCase,
    FindTaskByIdUseCase,
  ],
})
export class TaskModule {}

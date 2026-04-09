import { Module } from '@nestjs/common';
import { TasksController } from '../presentation/controllers/tasks.controller';
import { CreateTaskUseCase } from '../core/use-cases/task/create/create-task.use-case';
import { FindAllTaskUseCase } from '../core/use-cases/task/find-all/find-all-task.use-case';
import { FindTaskByIdUseCase } from '../core/use-cases/task/find-by-id/find-task-by-id.use-case';
import { TaskUpdateUseCase } from '../core/use-cases/task/update/task-update.use-case';
import { TaskRepository } from '../core/domain/repositories/task.repository';
import { TaskRepositoryImpl } from '../infrastructure/database/repositories/task.repository.impl';
import { WorkspaceModule } from './workspace.module';


@Module({
  imports: [WorkspaceModule],
  controllers: [TasksController],
  providers: [
    CreateTaskUseCase,
    TaskUpdateUseCase,
    FindAllTaskUseCase,
    FindTaskByIdUseCase,
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl,
    },
  ],
  exports: [],
})
export class TaskModule {}

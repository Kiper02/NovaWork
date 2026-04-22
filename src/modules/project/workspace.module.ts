import { Module } from '@nestjs/common';
import { WorkspacesController } from '../../presentation/controllers/workspaces.controller';
import { CreateWorkspaceUseCase } from '../../core/use-cases/workspace/create-workspace/create-workspace.use-case';
import { FindAllWorkspaceUseCase } from '../../core/use-cases/workspace/find-all-workspace/find-all-workspace.use-case';
import { FindMyWorkspaceUseCase } from '../../core/use-cases/workspace/find-my-workspace/find-my-workspace.use-case';

@Module({
  controllers: [WorkspacesController],
  providers: [
    CreateWorkspaceUseCase,
    FindAllWorkspaceUseCase,
    FindMyWorkspaceUseCase,
  ],
})
export class WorkspaceModule {}

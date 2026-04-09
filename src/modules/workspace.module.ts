import { Module } from '@nestjs/common';
import { WorkspacesController } from '../presentation/controllers/workspaces.controller';
import { CreateWorkspaceUseCase } from '../core/use-cases/workspace/create-workspace/create-workspace.use-case';
import { FindAllWorkspaceUseCase } from '../core/use-cases/workspace/find-all-workspace/find-all-workspace.use-case';
import { FindMyWorkspaceUseCase } from '../core/use-cases/workspace/find-my-workspace/find-my-workspace.use-case';
import { WorkspaceRepository } from '../core/domain/repositories/workspace.repository';
import { WorkspaceRepositoryImpl } from '../infrastructure/database/repositories/workspace.repository.impl';
import { UserRepository } from '../core/domain/repositories/user.repository';
import { UserRepositoryImpl } from '../infrastructure/database/repositories/user.repository.impl';
import { GlobalRoleRepository } from '../core/domain/repositories/global-role.repository';
import { GlobalRoleRepositoryImpl } from '../infrastructure/database/repositories/global-role.repository.impl';

@Module({
  controllers: [WorkspacesController],
  providers: [
    CreateWorkspaceUseCase,
    FindAllWorkspaceUseCase,
    FindMyWorkspaceUseCase,
    {
      provide: WorkspaceRepository,
      useClass: WorkspaceRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: GlobalRoleRepository,
      useClass: GlobalRoleRepositoryImpl,
    },
    {
      provide: GlobalRoleRepository,
      useClass: GlobalRoleRepositoryImpl,
    }
  ],
  exports: [WorkspaceRepository],
})
export class WorkspaceModule {}

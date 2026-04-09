import { WorkspaceRepository } from '../../../domain/repositories/workspace.repository';
import { WorkspaceEntity } from '../../../domain/entities/workspace.entity';
import { v4 as uuid } from 'uuid';
import { ICreateWorkspaceCommand } from './create-workspace.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateWorkspaceUseCase {
  public constructor(
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}

  public async execute(
    command: ICreateWorkspaceCommand,
  ): Promise<WorkspaceEntity> {
    const workspace = new WorkspaceEntity(
      uuid(),
      command.name,
      command.userId,
      false,
      new Date(),
      new Date(),
    );

    return this.workspaceRepository.save(workspace);
  }
}
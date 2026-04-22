import { WorkspaceRepository } from '../../../domain/repositories/project/workspace.repository';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { WorkspaceEntity } from '../../../domain/entities/project/workspace.entity';
import { WorkspaceFiltersValueObject } from '../../../domain/value-objects/workspace/workspace-filters.value-object';
import { PaginatedResultValueObject } from '../../../domain/value-objects/shared/paginated-result.value-object';
import { IFindAllWorkspaceCommand } from './find-all-workspace.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllWorkspaceUseCase {
  public constructor(private workspaceRepository: WorkspaceRepository) {}

  public async execute(
    command: IFindAllWorkspaceCommand,
  ): Promise<PaginatedResultValueObject<WorkspaceEntity>> {
    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );
    const params = new WorkspaceFiltersValueObject(
      command.userId,
      command.name,
    );
    return this.workspaceRepository.findAll(params, pagination);
  }
}
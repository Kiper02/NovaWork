import { WorkspaceRepository } from '../../../domain/repositories/workspace.repository';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../../domain/value-objects/shared/paginated-result.value-object';
import { WorkspaceEntity } from '../../../domain/entities/workspace.entity';
import { IFindMyWorkspaceCommand } from './find-my-workspace.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindMyWorkspaceUseCase {
  public constructor(
    private readonly workspaceRepository: WorkspaceRepository,
  ) {}
  public async execute(
    command: IFindMyWorkspaceCommand,
  ): Promise<PaginatedResultValueObject<WorkspaceEntity>> {
    const params = new PaginationParamsValueObject(command.page, command.limit);
    return this.workspaceRepository.findByUserId(command.userId, params);
  }
}
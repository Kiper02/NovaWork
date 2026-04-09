import { WorkspaceEntity } from '../entities/workspace.entity';
import { PaginatedResultValueObject } from '../value-objects/shared/paginated-result.value-object';
import { PaginationParamsValueObject } from '../value-objects/shared/pagination-params.value-object';
import { WorkspaceFiltersValueObject } from '../value-objects/workspace/workspace-filters.value-object';

export abstract class WorkspaceRepository {
  public abstract save(workspace: WorkspaceEntity): Promise<WorkspaceEntity>;
  public abstract update(
    workspace: Partial<WorkspaceEntity>,
  ): Promise<WorkspaceEntity>;
  public abstract findById(id: string): Promise<WorkspaceEntity | null>;
  public abstract findByUserId(
    userId: string,
    params: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<WorkspaceEntity>>;
  public abstract findAll(
    filters: WorkspaceFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<WorkspaceEntity>>;
  public abstract findDefaultUserWorkspace(userId: string): Promise<WorkspaceEntity | null>;
}

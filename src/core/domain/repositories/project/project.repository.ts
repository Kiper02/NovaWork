import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { ProjectEntity } from '../../entities/project/project.entity';
import { ProjectFiltersValueObject } from '../../value-objects/project/project-filters.value.object';

export abstract class ProjectRepository {
  public abstract save(entity: ProjectEntity): Promise<ProjectEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<ProjectEntity, 'id' | 'createdAt'>>,
  ): Promise<ProjectEntity>;
  public abstract findAll(
    params: ProjectFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ProjectEntity>>;
  public abstract findById(id: string): Promise<ProjectEntity | null>;
}
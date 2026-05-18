import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { CategoryEntity } from '../../entities/shared/category.entity';
import { CategoryFiltersValueObject } from '../../value-objects/category/category-filters.value.object';

export abstract class CategoryRepository {
  public abstract save(entity: CategoryEntity): Promise<CategoryEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<CategoryEntity, 'id' | 'createdAt'>>,
  ): Promise<CategoryEntity>;
  public abstract findAll(
    params: CategoryFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<CategoryEntity>>;
  public abstract findById(id: string): Promise<CategoryEntity | null>;
  public abstract findByIds(ids: string[]): Promise<CategoryEntity[]>;
  public abstract findByTagsIntersection(
    tags: string[],
    excludeIds: string[],
    limit: number,
  ): Promise<CategoryEntity[]>;
}

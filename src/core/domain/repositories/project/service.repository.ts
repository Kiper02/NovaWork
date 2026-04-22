import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { ServiceEntity } from '../../entities/project/service.entity';
import { ServiceFiltersValueObject } from '../../value-objects/service/service-filters.value-object';

export abstract class ServiceRepository {
  public abstract save(entity: ServiceEntity): Promise<ServiceEntity | null>;
  public abstract update(
    id: string,
    data: Partial<ServiceEntity>,
  ): Promise<ServiceEntity | null>;
  public abstract findAll(
    params: ServiceFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ServiceEntity>>;
  public abstract findById(id: string): Promise<ServiceEntity | null>;
}
import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { ServiceFiltersValueObject } from '../../value-objects/service/service-filters.value-object';
import { ServiceAggregate } from '../../aggregates/service.aggregate';

export abstract class ServiceQueryRepository {
  public abstract findAllForDetails(
    params: ServiceFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ServiceAggregate>>;

  public abstract findByIdForDetails(
    serviceId: string,
  ): Promise<ServiceAggregate | null>;
}

import { SubscriptionEntity } from '../entities/subscription.entity';
import { SubscriptionFiltersValueObject } from '../value-objects/subscription/subscription-filters.value-object';
import { PaginationParamsValueObject } from '../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../value-objects/shared/paginated-result.value-object';

export abstract class SubscriptionRepository {
  public abstract save(entity: SubscriptionEntity): Promise<SubscriptionEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<SubscriptionEntity, 'id' | 'createdAt'>>
  ): Promise<SubscriptionEntity>;
  public abstract findAll(
    params: SubscriptionFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<SubscriptionEntity>>;
  public abstract findByAccountId(
    accountId: string,
  ): Promise<SubscriptionEntity | null>;
}
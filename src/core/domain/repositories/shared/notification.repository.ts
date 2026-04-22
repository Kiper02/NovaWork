import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { NotificationEntity } from '../../entities/shared/notification.entity';
import { NotificationFiltersValueObject } from '../../value-objects/notification/notification-filters.value.object';

export abstract class NotificationRepository {
  public abstract save(entity: NotificationEntity): Promise<NotificationEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<NotificationEntity, 'id' | 'createdAt'>>,
  ): Promise<NotificationEntity>;
  public abstract findAll(
    params: NotificationFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<NotificationEntity>>;
  public abstract findById(id: string): Promise<NotificationEntity | null>;
}
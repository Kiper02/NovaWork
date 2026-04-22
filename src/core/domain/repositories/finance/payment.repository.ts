import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { PaymentEntity } from '../../entities/finance/payment.entity';
import { PaymentFiltersValueObject } from '../../value-objects/payment/payment-filters.value.object';

export abstract class PaymentRepository {
  public abstract save(entity: PaymentEntity): Promise<PaymentEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<PaymentEntity, 'id' | 'createdAt'>>,
  ): Promise<PaymentEntity>;
  public abstract findAll(
    params: PaymentFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<PaymentEntity>>;
  public abstract findById(id: string): Promise<PaymentEntity | null>;
  public abstract findByExternalId(externalId: string): Promise<PaymentEntity | null>
}

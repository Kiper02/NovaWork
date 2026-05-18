import { TransactionEntity } from '../../entities/finance/transaction.entity';
import { TransactionFiltersValueObject } from '../../value-objects/finance/transactions/transaction-filters.value-object';
import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';

export abstract class TransactionRepository {
  public abstract save(entity: TransactionEntity): Promise<TransactionEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<TransactionEntity, 'id'>>,
  ): Promise<TransactionEntity>;
  public abstract findById(id: string): Promise<TransactionEntity | null>;
  public abstract delete(id: string): Promise<void>;
  public abstract findAll(
    params: TransactionFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<TransactionEntity>>;
}

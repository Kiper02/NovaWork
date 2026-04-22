import { AccountEntity } from '../../entities/finance/account.entity';
import { AccountFiltersValueObject } from '../../value-objects/account/account-filters.value-object';
import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';

export abstract class AccountRepository {
  public abstract save(entity: AccountEntity): Promise<AccountEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<AccountEntity, 'id'>>,
  ): Promise<AccountEntity>;
  public abstract findAll(
    params: AccountFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<AccountEntity>>;
  public abstract findByUserId(userId: string): Promise<AccountEntity | null>;
}
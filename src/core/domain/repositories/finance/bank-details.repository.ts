import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { BankDetailsEntity } from '../../entities/finance/bank-details.entity';
import { BankDetailsFiltersValueObject } from '../../value-objects/bank-details/bank-details-filters.value.object';

export abstract class BankDetailsRepository {
  public abstract save(entity: BankDetailsEntity): Promise<BankDetailsEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<BankDetailsEntity, 'id' | 'createdAt'>>,
  ): Promise<BankDetailsEntity>;
  public abstract findAll(
    params: BankDetailsFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<BankDetailsEntity>>;
  public abstract findById(id: string): Promise<BankDetailsEntity | null>;
  public abstract findByBeneficiaryId(
    beneficiaryId: string,
  ): Promise<BankDetailsEntity[] | null>;
  public abstract findByUserId(userId: string): Promise<BankDetailsEntity[]>
}

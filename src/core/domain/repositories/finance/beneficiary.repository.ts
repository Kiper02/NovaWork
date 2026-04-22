import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { BeneficiaryEntity } from '../../entities/finance/beneficiary.entity';
import { BeneficiaryFiltersValueObject } from '../../value-objects/beneficiary/beneficiary-filters.value.object';


export abstract class BeneficiaryRepository {
  public abstract save(entity: BeneficiaryEntity): Promise<BeneficiaryEntity>;
  public abstract update(
    entity: BeneficiaryEntity,
  ): Promise<BeneficiaryEntity>;
  public abstract findAll(
    params: BeneficiaryFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<BeneficiaryEntity>>;
  public abstract findById(id: string): Promise<BeneficiaryEntity | null>;
  public abstract findByAccountId(accountId: string): Promise<BeneficiaryEntity[]>;
  public abstract remove(id: string): Promise<void>;
}
import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { CommissionRuleEntity } from '../../entities/finance/commission-rule.entity';
import {
  CommissionRuleFiltersValueObject
} from '../../value-objects/commission-rule/commission-rule-filters.value.object';

export abstract class CommissionRuleRepository {
  public abstract save(
    entity: CommissionRuleEntity,
  ): Promise<CommissionRuleEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<CommissionRuleEntity, 'id'>>,
  ): Promise<CommissionRuleEntity>;
  public abstract findAll(
    params: CommissionRuleFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<CommissionRuleEntity>>;
  public abstract findById(id: string): Promise<CommissionRuleEntity | null>;
  public abstract findActive(): Promise<CommissionRuleEntity[]>;
}
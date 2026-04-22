import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { ContractEntity } from '../../entities/project/contract.entity';
import { ContractFiltersValueObject } from '../../value-objects/contract/contract-filters.value.object';

export abstract class ContractRepository {
  public abstract save(entity: ContractEntity): Promise<ContractEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<ContractEntity, 'id' | 'createdAt'>>,
  ): Promise<ContractEntity>;
  public abstract findAll(
    params: ContractFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ContractEntity>>;
  public abstract findById(id: string): Promise<ContractEntity | null>;
  public abstract findByServiceId(serviceId: string): Promise<ContractEntity | null>
  public abstract findByTaskId(taskId: string): Promise<ContractEntity | null>
}

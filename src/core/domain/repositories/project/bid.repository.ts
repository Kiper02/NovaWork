import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { BidEntity } from '../../entities/project/bid.entity';
import { BidFiltersValueObject } from '../../value-objects/bid/bid-filters.value.object';

export abstract class BidRepository {
  public abstract save(entity: BidEntity): Promise<BidEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<BidEntity, 'id' | 'createdAt'>>,
  ): Promise<BidEntity>;
  public abstract findAll(
    params: BidFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<BidEntity>>;
  public abstract findById(id: string): Promise<BidEntity | null>;
  public abstract findByUserIdAndTaskId(userId: string, taskId: string): Promise<BidEntity | null>;
}
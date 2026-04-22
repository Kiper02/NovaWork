import { PaginationParamsValueObject } from '../../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../../value-objects/shared/paginated-result.value-object';
import { InvitationEntity } from '../../entities/project/invitation.entity';
import { InvitationFiltersValueObject } from '../../value-objects/invitation/invitation-filters.value.object';

export abstract class InvitationRepository {
  public abstract save(entity: InvitationEntity): Promise<InvitationEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<InvitationEntity, 'id' | 'createdAt'>>,
  ): Promise<InvitationEntity>;
  public abstract findAll(
    params: InvitationFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<InvitationEntity>>;
  public abstract findById(id: string): Promise<InvitationEntity | null>;
}
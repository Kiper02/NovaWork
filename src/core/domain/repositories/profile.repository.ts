import { ProfileEntity } from '../entities/profile.entity';
import { ProfileFiltersValueObject } from '../value-objects/profile/profile-filters.value.object';
import { PaginationParamsValueObject } from '../value-objects/shared/pagination-params.value-object';
import { PaginatedResultValueObject } from '../value-objects/shared/paginated-result.value-object';

export abstract class ProfileRepository {
  public abstract save(entity: ProfileEntity): Promise<ProfileEntity>;
  public abstract update(
    id: string,
    data: Partial<Omit<ProfileEntity, 'id' | 'createdAt'>>,
  ): Promise<ProfileEntity>;
  public abstract findAll(
    params: ProfileFiltersValueObject,
    pagination: PaginationParamsValueObject,
  ): Promise<PaginatedResultValueObject<ProfileEntity>>;
  public abstract findByUserId(userId: string): Promise<ProfileEntity | null>;
}
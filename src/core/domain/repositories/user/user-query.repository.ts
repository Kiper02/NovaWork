import { UserAggregate } from '../../aggregates/user.aggregate';

export abstract class UserQueryRepository {
  public abstract findMe(id: string): Promise<UserAggregate | null>;
  public abstract findByIdWithProfile(id: string): Promise<UserAggregate | null>;
  public abstract findByIdWithAccount(id: string): Promise<UserAggregate | null>;
}
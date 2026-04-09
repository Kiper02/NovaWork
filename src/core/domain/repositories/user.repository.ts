import { UserEntity } from '../entities/user.entity';
import { UserAggregate } from '../aggregates/user.aggregate';

export abstract class UserRepository {
  public abstract save(user: UserEntity): Promise<UserEntity>;
  public abstract findByEmail(email: string): Promise<UserEntity | null>;
  public abstract findByUsername(username: string): Promise<UserEntity | null>;
  public abstract findById(id: string): Promise<UserEntity | null>;
  public abstract findMe(id: string): Promise<UserAggregate | null>
}
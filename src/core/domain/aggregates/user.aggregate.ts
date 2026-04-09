import { UserEntity } from '../entities/user.entity';
import { ProfileEntity } from '../entities/profile.entity';
import { AccountEntity } from '../entities/account.entity';

export class UserAggregate {
  constructor(
    public readonly user: UserEntity,
    public readonly profile: ProfileEntity | null,
    public readonly account: AccountEntity | null,
  ) {}
}

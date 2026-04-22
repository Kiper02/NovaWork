import { UserEntity } from '../entities/user/user.entity';
import { ProfileEntity } from '../entities/user/profile.entity';
import { AccountEntity } from '../entities/finance/account.entity';
import { WorkspaceEntity } from '../entities/project/workspace.entity';

export class UserAggregate {
  constructor(
    public readonly user: UserEntity,
    public readonly profile: ProfileEntity | null,
    public readonly account: AccountEntity | null,
    public readonly workspaces: WorkspaceEntity[] | null,
  ) {}
}

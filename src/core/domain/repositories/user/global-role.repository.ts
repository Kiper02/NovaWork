import { GlobalRoleEntity } from '../../entities/user/global-role.entity';

export abstract class GlobalRoleRepository {
  public abstract findUserRoles(userId: string): Promise<GlobalRoleEntity[]>;
}

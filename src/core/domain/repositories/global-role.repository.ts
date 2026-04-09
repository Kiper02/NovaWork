import { GlobalRoleEntity } from '../entities/global-role.entity';

export abstract class GlobalRoleRepository {
  public abstract findUserRoles(userId: string): Promise<GlobalRoleEntity[]>;
}

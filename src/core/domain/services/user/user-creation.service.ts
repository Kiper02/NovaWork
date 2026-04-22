import { v4 as uuid } from 'uuid';
import { UserEntity } from '../../entities/user/user.entity';
import { ProfileEntity } from '../../entities/user/profile.entity';
import { AccountEntity } from '../../entities/finance/account.entity';
import { Injectable } from '@nestjs/common';
import { WorkspaceEntity } from '../../entities/project/workspace.entity';
import { NotificationSettingsValueObject } from '../../value-objects/profile/notification-settings.value-object';

export interface UserCreationParams {
  email: string;
  username: string;
  passwordHash: string;
  firstName: string;
  middleName: string;
  lastName: string;
  storageQuotaBytes: bigint;
}

@Injectable()
export class UserCreationService {
  public create(params: UserCreationParams): {
    user: UserEntity;
    profile: ProfileEntity;
    account: AccountEntity;
    workspace: WorkspaceEntity;
  } {
    const userId = uuid();
    const user = new UserEntity(
      userId,
      params.email,
      params.username,
      params.passwordHash,
      new Date(),
      new Date(),
    );

    const profile = new ProfileEntity(
      uuid(),
      params.firstName,
      params.middleName,
      params.lastName,
      userId,
      null,
      NotificationSettingsValueObject.default(),
      new Date(),
      new Date(),
    );
    const account = new AccountEntity(
      uuid(),
      userId,
      0,
      0,
      params.storageQuotaBytes,
      BigInt(0),
    );

    const workspace = new WorkspaceEntity(
      uuid(),
      'Default Workspace',
      userId,
      true,
      new Date(),
      new Date(),
    );

    return { user, profile, account, workspace };
  }
}

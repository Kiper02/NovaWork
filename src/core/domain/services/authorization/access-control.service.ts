import { Injectable } from '@nestjs/common';
import { GlobalRoleRepository } from '../../repositories/user/global-role.repository';
import { UPDATE_RESOURCES } from '../../constants/roles.constants';

@Injectable()
export class AccessControlService {
  public constructor(
    private readonly globalRoleRepository: GlobalRoleRepository,
  ) {}
  public async checkAccessOrThrow(
    userId: string,
    allowedRoles: string[] = UPDATE_RESOURCES,
    resourceOwnerId: string,
    exception: Error,
  ) {
    if (resourceOwnerId && userId === resourceOwnerId) {
      return;
    }

    const roles = await this.globalRoleRepository.findUserRoles(userId);
    const currentRoles = roles.map((role) => role.name);
    const hasRole = allowedRoles.some((role) => currentRoles.includes(role));

    if (!hasRole) {
      throw exception;
    }
  }
}
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GlobalRoleRepository } from '../../core/domain/repositories/global-role.repository';
import { Reflector } from '@nestjs/core';
import type { Request} from 'express'
import { UserEntity } from '../../core/domain/entities/user.entity';

@Injectable()
export class GlobalRolesGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly globalRoleRepository: GlobalRoleRepository,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user: UserEntity | undefined = request.user;

    if(!user) return false;

    const roles = await this.globalRoleRepository.findUserRoles(user.id);
    const currentRoles = roles.map((role) => role.name);

    return requiredRoles.some((requiredRole) =>
      currentRoles.includes(requiredRole),
    );
  }
}
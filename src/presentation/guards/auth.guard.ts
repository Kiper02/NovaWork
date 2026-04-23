import {
  Injectable,
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user/user.repository';
import { AppUnauthorizedException } from '../../core/domain/exceptions/auth/app-unauthorized.exception';
import { ERROR_CODES } from '../../core/domain/constants/error-codes.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userRepository: UserRepository) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.session);
    if (typeof request.session?.userId === 'undefined') {
      throw new AppUnauthorizedException(
        'Пользователь не авторизован',
        ERROR_CODES.SESSION_MISSING,
      );
    }

    const user = await this.userRepository.findById(request.session.userId);
    if (!user) {
      throw new AppUnauthorizedException(
        'Пользователь не авторизован',
        ERROR_CODES.USER_NOT_FOUND,
      );
    }

    request.user = user;

    return true;
  }
}

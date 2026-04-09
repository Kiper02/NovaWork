import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../core/domain/repositories/user.repository';

@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userRepository: UserRepository) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (typeof request.session?.userId === 'undefined') {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    const user = await this.userRepository.findById(request.session.userId);
    if (!user) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    request.user = user;

    return true;
  }
}

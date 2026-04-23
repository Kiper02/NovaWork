import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { UserNotFoundException } from '../../../core/domain/exceptions/user/user-not-found.exception';
import { UserAlreadyExistsException } from '../../../core/domain/exceptions/user/user-already-exists.exception';

@Catch(UserAlreadyExistsException)
export class UserAlreadyExistsExceptionFilter {
  public catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      timestamp: new Date().toISOString(),
      message: 'Пользователь с таким email или username уже существует',
      code: 'USER_ALREADY_EXISTS',
    });
  }
}

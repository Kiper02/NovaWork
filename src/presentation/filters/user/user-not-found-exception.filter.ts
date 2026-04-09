import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { UserNotFoundException } from '../../../core/domain/exceptions/user/user-not-found.exception';

@Catch(UserNotFoundException)
export class UserNotFoundExceptionFilter {
  public catch(exception: UserNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

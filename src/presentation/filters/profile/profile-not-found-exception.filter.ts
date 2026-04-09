import {
  ArgumentsHost,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { ProfileNotFoundException } from '../../../core/domain/exceptions/profile/profile-not-found.exception';

@Catch(ProfileNotFoundException)
export class ProfileNotFoundExceptionFilter {
  public catch(exception: ProfileNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
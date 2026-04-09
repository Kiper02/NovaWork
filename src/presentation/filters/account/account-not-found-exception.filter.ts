import {
  ArgumentsHost,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import { AccountNotFoundException } from '../../../core/domain/exceptions/account/account-not-found.exception';

@Catch(AccountNotFoundException)
export class AccountNotFoundExceptionFilter {
  public catch(exception: AccountNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
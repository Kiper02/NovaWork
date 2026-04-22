import {
  ArgumentsHost,
  Catch,
  HttpStatus,
} from '@nestjs/common';
import type { Response } from 'express';
import {
  BankDetailsNotFoundException
} from '../../../core/domain/exceptions/bank-details/bank-details-not-found.exception';

@Catch(BankDetailsNotFoundException)
export class BankDetailsNotFoundExceptionFilter {
  public catch(exception: BankDetailsNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}
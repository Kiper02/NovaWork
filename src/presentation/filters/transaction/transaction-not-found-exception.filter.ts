import { ExceptionFilter, Catch, NotFoundException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { TransactionNotFoundException } from '../../../core/domain/exceptions/transaction/transaction-not-found.exception';

@Catch(TransactionNotFoundException)
export class TransactionNotFoundExceptionFilter implements ExceptionFilter {
  public catch(exception: TransactionNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: 'Транзакция не найдена',
      error: 'Not Found',
    });
  }
}

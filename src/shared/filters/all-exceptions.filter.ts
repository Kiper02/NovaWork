import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  public catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string = 'An unknown error has occurred';
    let code: string | null = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null
      ) {
        message =
          (exceptionResponse as any).message ??
          JSON.stringify(exceptionResponse);
        if (Array.isArray(message)) message = message[0];
      } else {
        message = String(exceptionResponse);
      }

      if ((exception as any).code) {
        code = (exception as any).code;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    const responseBody: any = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      message,
    };
    if (code) {
      responseBody.code = code;
    }

    response.status(status).json(responseBody);
  }
}

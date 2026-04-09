import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { TaskUpdateForbiddenException } from '../../../core/domain/exceptions/task/task-update-forbidden.exception';

@Catch(TaskUpdateForbiddenException)
export class TaskForbiddenExceptionFilter {
  public catch(exception: TaskUpdateForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.FORBIDDEN).json({
      statusCode: HttpStatus.FORBIDDEN,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

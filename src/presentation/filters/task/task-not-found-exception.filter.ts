import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { TaskNotFoundException } from '../../../core/domain/exceptions/task/task-not-found.exception';

@Catch(TaskNotFoundException)
export class TaskNotFoundExceptionFilter {
  public catch(exception: TaskNotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ChatForbiddenException } from '../../../core/domain/exceptions/chat/chat-forbidden.exception';

@Catch(ChatForbiddenException)
export class ChatForbiddenExceptionFilter {
  public catch(exception: ChatForbiddenException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.FORBIDDEN).json({
      statusCode: HttpStatus.FORBIDDEN,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { WorkspaceNotFoundException } from '../../../core/domain/exceptions/workspace/workspace-not-found.exception';
import {
  DefaultWorkspaceNotFoundException
} from '../../../core/domain/exceptions/workspace/default-workspace-not-found.exception';

@Catch(WorkspaceNotFoundException, DefaultWorkspaceNotFoundException)
export class WorkspaceNotFoundExceptionFilter {
  public catch(
    exception: WorkspaceNotFoundException | DefaultWorkspaceNotFoundException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(HttpStatus.NOT_FOUND).json({
      statusCode: HttpStatus.NOT_FOUND,
      timestamp: new Date().toISOString(),
      message: exception.message,
    });
  }
}

import { Request, Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common';
import { UserEntity } from '../../core/domain/entities/user.entity';
import { ConfigService } from '@nestjs/config';

export class SessionHelper {
  static async save(
    req: Request,
    user: UserEntity,
    metadata?: any,
  ): Promise<void> {
    req.session.userId = user.id;
    req.session.metadata = metadata;
    return new Promise((resolve, reject) => {
      req.session.save((err) => {
        if (err)
          reject(
            new InternalServerErrorException('Не удалось сохранить сессию'),
          );
        else resolve();
      });
    });
  }

  static async destroy(
    req: Request,
    res: Response,
    configService: ConfigService,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err)
          reject(new InternalServerErrorException('Не удалось удалить сессию'));
        res.clearCookie(configService.getOrThrow<string>('SESSION_NAME'));
        resolve();
      });
    });
  }
}

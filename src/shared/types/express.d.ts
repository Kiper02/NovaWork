import 'express';

declare module 'express' {
  import { UserEntity } from '../../core/domain/entities/user.entity';

  interface Request {
    user?: UserEntity
  }
}
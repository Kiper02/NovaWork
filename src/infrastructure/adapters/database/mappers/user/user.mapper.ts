import { UserEntity } from '../../../../../core/domain/entities/user/user.entity';
import { User } from '@prisma/client';

export class UserMapper {
  public static toEntity(model: User): UserEntity {
    return {
      id: model.id,
      email: model.email,
      username: model.username,
      passwordHash: model.password,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt,
    };
  }

  public static toModel(entity: UserEntity): User {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      password: entity.passwordHash,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
import { type Prisma, Profile } from '@prisma/client';
import { ProfileEntity } from '../../../core/domain/entities/profile.entity';

export class ProfileMapper {
  public static toEntity(model: Profile): ProfileEntity {
    return {
      id: model.id,
      firstName: model.firstName,
      middleName: model.middleName,
      lastName: model.lastName,
      userId: model.userId,
      createdAt: model.createdAt,
      updatedAt: model.updatedAt
    };
  }

  public static toModel(entity: ProfileEntity): Profile {
    return {
      id: entity.id,
      firstName: entity.firstName,
      middleName: entity.middleName,
      lastName: entity.lastName,
      userId: entity.userId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<ProfileEntity, 'id' | 'createdAt'>>,
  ): Prisma.ProfileUpdateInput {
    const result: Prisma.ProfileUpdateInput = {};

    if (data.firstName !== undefined) result.firstName = data.firstName;
    if (data.middleName !== undefined) result.middleName = data.middleName;
    if (data.lastName !== undefined) result.lastName = data.lastName;
    if (data.updatedAt !== undefined) result.updatedAt = data.updatedAt;

    return result;
  }
}

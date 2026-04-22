import { type Prisma, Profile } from '@prisma/client';
import { ProfileEntity } from '../../../../../core/domain/entities/user/profile.entity';
import {
  NotificationSettingsValueObject
} from '../../../../../core/domain/value-objects/profile/notification-settings.value-object';

export class ProfileMapper {
  public static toEntity(model: Profile): ProfileEntity {
    let notificationSettings: NotificationSettingsValueObject;

    if (model.notificationSettings) {
      notificationSettings = NotificationSettingsValueObject.fromJSON(
        model.notificationSettings as Record<string, boolean>,
      );
    } else {
      notificationSettings = NotificationSettingsValueObject.default();
    }

    return new ProfileEntity(
      model.id,
      model.firstName,
      model.middleName,
      model.lastName,
      model.userId,
      model.avatar,
      notificationSettings,
      model.createdAt,
      model.updatedAt,
    );
  }

  public static toModel(entity: ProfileEntity): Prisma.ProfileCreateInput {
    return {
      id: entity.id,
      firstName: entity.firstName,
      middleName: entity.middleName,
      lastName: entity.lastName,
      user: {
        connect: {
          id: entity.userId
        }
      },
      avatar: entity.avatar,
      notificationSettings:
        entity.notificationSettings.toJSON() as Prisma.InputJsonValue,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  public static toModelUpdate(
    data: Partial<Omit<ProfileEntity, 'id' | 'createdAt'>>,
  ): Prisma.ProfileUpdateInput {
    const result: Prisma.ProfileUpdateInput = {};

    if (data.firstName !== undefined) result.firstName = data.firstName;
    if (data.middleName !== undefined) result.middleName = data.middleName;
    if (data.lastName !== undefined) result.lastName = data.lastName;
    if (data.avatar !== undefined) result.avatar = data.avatar;
    if (data.updatedAt !== undefined) result.updatedAt = data.updatedAt;

    return result;
  }
}

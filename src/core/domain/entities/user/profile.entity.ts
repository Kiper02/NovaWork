import { NotificationSettingsValueObject } from '../../value-objects/profile/notification-settings.value-object';

export class ProfileEntity {
  public constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly middleName: string | null,
    public readonly lastName: string,
    public readonly userId: string,
    public avatar: string | null,
    public readonly notificationSettings: NotificationSettingsValueObject,
    public readonly createdAt: Date,
    public readonly updatedAt: Date
  ) {}
}
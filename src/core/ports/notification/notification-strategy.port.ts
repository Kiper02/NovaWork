import { EnumNotificationType } from '../../domain/entities/shared/notification.entity';

export abstract class NotificationStrategyPort {
  public readonly type: EnumNotificationType;

  public abstract send(to: string, notification: Notification): Promise<void>
}
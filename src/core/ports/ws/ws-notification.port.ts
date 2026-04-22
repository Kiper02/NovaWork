import { NotificationEntity } from '../../domain/entities/shared/notification.entity';

export abstract class WsNotificationPort {
  public abstract sendToUser(userId: string, notification: NotificationEntity): void
}
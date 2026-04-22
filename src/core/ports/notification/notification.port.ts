import { NotificationEntity } from '../../domain/entities/shared/notification.entity';

export abstract class NotificationPort {
  public abstract send(userId: string, email: string, notification: NotificationEntity): Promise<void>
}
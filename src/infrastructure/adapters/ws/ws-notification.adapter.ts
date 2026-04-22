import { NotificationGateway } from '../../../presentation/gateways/notification.gateway';
import { WsNotificationPort } from '../../../core/ports/ws/ws-notification.port';
import { NotificationEntity } from 'src/core/domain/entities/shared/notification.entity';

export class WsNotificationAdapter implements WsNotificationPort {
  public constructor(
    private readonly notificationGateway: NotificationGateway,
  ) {}

  public async sendToUser(
    userId: string,
    notification: NotificationEntity,
  ) {
    this.notificationGateway.server
      .to(`user:${userId}`)
      .emit('new-notification', notification);
  }
}
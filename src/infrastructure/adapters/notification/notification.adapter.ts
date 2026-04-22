import { NotificationPort } from '../../../core/ports/notification/notification.port';
import { NotificationRepository } from '../../../core/domain/repositories/shared/notification.repository';
import { ProfileRepository } from '../../../core/domain/repositories/user/profile.repository';
import {
  EnumNotificationType,
  NotificationEntity,
} from 'src/core/domain/entities/shared/notification.entity';
import { ProfileNotFoundException } from '../../../core/domain/exceptions/profile/profile-not-found.exception';
import {
  UnknownNotificationTypeException
} from '../../../core/domain/exceptions/notification/unknown-notification-type.exception';
import { AcceptedBidStrategy } from '../mail/strategies/accepted-bid.strategy';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsNotificationPort } from '../../../core/ports/ws/ws-notification.port';
import { EmailSenderPort } from '../../../core/ports/email-sender/email-sender.port';

@Injectable()
export class NotificationAdapter implements NotificationPort {
  public constructor(
    private readonly notificationRepository: NotificationRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly wsNotificationPort: WsNotificationPort,
    private readonly emailSenderPort: EmailSenderPort,
    private readonly configService: ConfigService,
  ) {}

  public async send(
    userId: string,
    email: string,
    notification: NotificationEntity,
  ): Promise<void> {
    const profile = await this.profileRepository.findByUserId(userId);
    if (!profile) {
      throw new ProfileNotFoundException();
    }

    const settings = profile.notificationSettings;

    await this.notificationRepository.save(notification);

    if (settings.emailEnabled) {
      switch (notification.type) {
        case EnumNotificationType.BID_ACCEPTED:
          await new AcceptedBidStrategy(
            this.emailSenderPort,
            this.configService,
          ).execute(email, notification.metadata);
          break;
        default:
          throw new UnknownNotificationTypeException();
      }
    }

    if (settings.pushEnabled) {
      // TODO: Отправка мобильных push уведомлений
    }

    this.wsNotificationPort.sendToUser(userId, notification);
  }
}
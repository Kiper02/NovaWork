import { Global, Module } from '@nestjs/common';
import { ProfileModule } from '../user/profile.module';
import { WsNotificationPort } from '../../core/ports/ws/ws-notification.port';
import { WsNotificationAdapter } from '../../infrastructure/adapters/ws/ws-notification.adapter';
import { AcceptedBidStrategy } from '../../infrastructure/adapters/mail/strategies/accepted-bid.strategy';
import { MailerModule } from '@nestjs-modules/mailer';
import { NotificationPort } from '../../core/ports/notification/notification.port';
import { NotificationAdapter } from '../../infrastructure/adapters/notification/notification.adapter';

@Global()
@Module({
  imports: [ProfileModule, MailerModule],
  providers: [
    AcceptedBidStrategy,
    {
      provide: WsNotificationPort,
      useClass: WsNotificationAdapter,
    },
    {
      provide: NotificationPort,
      useClass: NotificationAdapter,
    },
  ],
  exports: [WsNotificationPort],
})
export class NotificationModule {}

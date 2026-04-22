import { Global, Module } from '@nestjs/common';
import { ChatGateway } from '../../presentation/gateways/chat.gateway';
import { NotificationGateway } from '../../presentation/gateways/notification.gateway';

@Global()
@Module({
  providers: [
    {
      provide: ChatGateway,
      useClass: ChatGateway,
    },
    {
      provide: NotificationGateway,
      useClass: NotificationGateway,
    },
  ],
  exports: [ChatGateway, NotificationGateway],
})
export class GatewayModule {}

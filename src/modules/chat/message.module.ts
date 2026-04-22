import { Module } from '@nestjs/common';
import { MessageController } from '../../presentation/controllers/message.controller';
import { CreateMessageUseCase } from '../../core/use-cases/message/create/create-message.use-case';
import { FindAllMessageUseCase } from '../../core/use-cases/message/find-all/find-all-message.use-case';
import { WsChatPort } from '../../core/ports/ws/ws-chat.port';
import { WsChatAdapter } from '../../infrastructure/adapters/ws/ws-chat.adapter';

@Module({
  controllers: [MessageController],
  providers: [
    CreateMessageUseCase,
    FindAllMessageUseCase,
    {
      provide: WsChatPort,
      useClass: WsChatAdapter,
    },
  ],
})
export class MessageModule {}

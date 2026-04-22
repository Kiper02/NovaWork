import { Module } from '@nestjs/common';
import { ChatController } from '../../presentation/controllers/chat.controller';
import { CreateChatUseCase } from '../../core/use-cases/chat/create/create-chat.use-case';
import { ChatUpdateUseCase } from '../../core/use-cases/chat/update/chat-update.use-case';
import { FindAllChatUseCase } from '../../core/use-cases/chat/find-all/find-all-chat.use-case';
import { FindMyChatUseCase } from '../../core/use-cases/chat/find-my/find-my-chat.use-case';
import { FindChatByIdUseCase } from '../../core/use-cases/chat/find-by-id/find-chat-by-id.use-case';
import { ContextValidatorService } from '../../core/domain/services/chat/context-validator.service';
import { ChatReadPort } from '../../core/ports/chat/chat-read.port';
import { ChatReadAdapter } from '../../infrastructure/adapters/chat/chat-read.adapter';



@Module({
  controllers: [ChatController],
  providers: [
    CreateChatUseCase,
    ChatUpdateUseCase,
    FindAllChatUseCase,
    FindMyChatUseCase,
    FindChatByIdUseCase,
    {
      provide: ContextValidatorService,
      useClass: ContextValidatorService,
    },
    {
      provide: ChatReadPort,
      useClass: ChatReadAdapter
    }
  ],
})
export class ChatModule {}

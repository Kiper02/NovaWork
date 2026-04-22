import { Injectable } from '@nestjs/common';
import { ChatGateway } from '../../../presentation/gateways/chat.gateway';
import { MessageEntity } from '../../../core/domain/entities/chat/message.entity';
import { WsChatPort } from '../../../core/ports/ws/ws-chat.port';

@Injectable()
export class WsChatAdapter implements WsChatPort {
  public constructor(private readonly chatGateway: ChatGateway) {}

  public async sendToChat(message: MessageEntity): Promise<void> {
    this.chatGateway.server
      .to(`chat:${message.chatId}`)
      .emit('new-message', message);
  }
}

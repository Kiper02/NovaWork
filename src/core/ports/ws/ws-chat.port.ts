import { MessageEntity } from '../../domain/entities/chat/message.entity';

export abstract class WsChatPort {
  public abstract sendToChat(message: MessageEntity): Promise<void>;
}
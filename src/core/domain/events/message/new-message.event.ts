import { MessageEntity } from '../../entities/chat/message.entity';

export class NewMessageEvent {
  constructor(
    public readonly message: MessageEntity,
  ) {}
}

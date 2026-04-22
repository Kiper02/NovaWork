import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { IFindChatByIdCommand } from './find-chat-by-id.command';
import { ChatNotFoundException } from '../../../domain/exceptions/chat/chat-not-found.exception';

@Injectable()
export class FindChatByIdUseCase {
  public constructor(
    private readonly chatRepository: ChatRepository
  ) {
  }

  public async execute(command: IFindChatByIdCommand) {
    const chat = await this.chatRepository.findById(command.chatId)

    if(!chat) {
      throw new ChatNotFoundException()
    }

    return chat
  }
}
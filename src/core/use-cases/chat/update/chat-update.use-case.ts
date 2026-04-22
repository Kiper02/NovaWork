import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { IChatUpdateCommand } from './chat-update.command';
import { ChatNotFoundException } from '../../../domain/exceptions/chat/chat-not-found.exception';

@Injectable()
export class ChatUpdateUseCase {
  public constructor(
    private chatRepository: ChatRepository,
    private userRepository: UserRepository
  ) {
  }

  public async execute(command: IChatUpdateCommand) {
    //TODO: Логика обновления
    // - Пользователь может обновлять название чата
    // - Пользователи с ролями super_admin, admin, moderator может обновлять все поля


    const chat = await this.chatRepository.findById(command.chatId)
    if(!chat) {
      throw new ChatNotFoundException()
    }

    return chat;
  }
}
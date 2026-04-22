import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { IChatDeleteCommand } from './chat-delete.command';

@Injectable()
export class ChatDeleteUseCase {
  public constructor(
    private chatRepository: ChatRepository,
    private userRepository: UserRepository,
  ) {
  }

  public async execute(command: IChatDeleteCommand) {
    // TODO: Реализовать логику удаления
  }
}
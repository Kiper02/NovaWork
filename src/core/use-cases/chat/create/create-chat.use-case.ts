import { Injectable } from '@nestjs/common';
import { ICreateChatCommand } from './create-chat.command';
import {
  ChatEntity,
} from '../../../domain/entities/chat/chat.entity';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import {v4 as uuid} from 'uuid';
import { ContextValidatorService } from '../../../domain/services/chat/context-validator.service';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { UserNotFoundException } from '../../../domain/exceptions/user/user-not-found.exception';

@Injectable()
export class CreateChatUseCase {
  public constructor(
    private readonly chatRepository: ChatRepository,
    private readonly contextValidator: ContextValidatorService,
    private readonly userRepository: UserRepository
  ) {
  }

  public async execute(command: ICreateChatCommand) {
    if(command.membersIds.length) {
     const existingUsers = await this.userRepository.findByIds(command.membersIds);
     if(existingUsers.length !== command.membersIds.length) {
       const foundIds = new Set(existingUsers.map(user => user.id));
       const missingIds = command.membersIds.filter(id => !foundIds.has(id));
       throw new UserNotFoundException('userId', missingIds.join(', '))
     }
    }

    if(command.context && command.contextId) {
      await this.contextValidator.validateContext(
        command.context,
        command.contextId,
      );
    }

    const chat = new ChatEntity(
      uuid(),
      command.title,
      command.type,
      [],
      new Date(),
      new Date(),
      null,
      command.context ?? null,
      command.contextId ?? null,
    );

    command.membersIds.map(memberId => {
      chat.addMember(memberId);
    })

    return this.chatRepository.save(chat);
  }
}
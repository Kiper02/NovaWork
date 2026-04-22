import { Injectable } from '@nestjs/common';
import { ChatFiltersValueObject } from '../../../domain/value-objects/chat/chat-filters.value.object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { ChatReadPort } from '../../../ports/chat/chat-read.port';
import { IFindMyChatCommand } from './find-my-chat.command';

@Injectable()
export class FindMyChatUseCase {
  public constructor(
    private readonly chatReadPort: ChatReadPort
  ) {
  }

  public async execute(command: IFindMyChatCommand) {
    const params = new ChatFiltersValueObject(
      command.title,
      command.type,
      command.userId,
      command.context,
      command.createdAtStart,
      command.createdAtEnd,
    )

    const pagination = new PaginationParamsValueObject(command.page, command.limit)
    return this.chatReadPort.findChatsWithLastMessage(params, pagination);
  }
}
import { Injectable } from '@nestjs/common';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { IFindAllChatCommand } from './find-all-chat.command';
import { ChatFiltersValueObject } from '../../../domain/value-objects/chat/chat-filters.value.object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';

@Injectable()
export class FindAllChatUseCase {
  public constructor(
    private readonly chatRepository: ChatRepository,
  ) {
  }

  public async execute(command: IFindAllChatCommand) {
    const params = new ChatFiltersValueObject(
      command.title,
      command.type,
      command.memberId,
      command.context,
      command.createdAtStart,
      command.createdAtEnd,
    )

    const pagination = new PaginationParamsValueObject(command.page, command.limit)

    return this.chatRepository.findAll(params, pagination);
  }
}
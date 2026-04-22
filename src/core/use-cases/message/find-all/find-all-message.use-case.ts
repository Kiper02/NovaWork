import { Injectable } from '@nestjs/common';
import { MessageRepository } from '../../../domain/repositories/chat/message.repository';
import { IFindAllMessageCommand } from './find-all-message.command';
import { MessageFiltersValueObject } from '../../../domain/value-objects/message/message-filters.value.object';
import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { ChatNotFoundException } from '../../../domain/exceptions/chat/chat-not-found.exception';
import { ChatForbiddenException } from '../../../domain/exceptions/chat/chat-forbidden.exception';
import { AccessControlService } from '../../../domain/services/authorization/access-control.service';
import { ProjectUpdateForbiddenException } from '../../../domain/exceptions/project/project-update-forbidden.exception';
import { READ_RESOURCES } from '../../../domain/constants/roles.constants';
import { GlobalRoleRepository } from '../../../domain/repositories/user/global-role.repository';

@Injectable()
export class FindAllMessageUseCase {
  public constructor(
    private readonly messageRepository: MessageRepository,
    private readonly chatRepository: ChatRepository,
    private readonly globalRolesRepository: GlobalRoleRepository
  ) {}

  public async execute(command: IFindAllMessageCommand) {
    const chat = await this.chatRepository.findById(command.chatId);
    if (!chat) {
      throw new ChatNotFoundException();
    }
    const isMember = chat.members.some(
      (member) => member.userId === command.userId,
    );

    const userRoles = await this.globalRolesRepository.findUserRoles(command.userId);
    const hasGlobalReadPermission = userRoles.some((role) =>
      READ_RESOURCES.includes(role.name),
    );

    if(!isMember && !hasGlobalReadPermission) {
      throw new ChatForbiddenException()
    }

    const params = new MessageFiltersValueObject(
      command.senderId,
      command.chatId,
      command.text,
      command.createdAtStart,
      command.createdAtEnd,
    );
    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );

    return this.messageRepository.findAll(params, pagination);
  }
}
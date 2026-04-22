import { Injectable } from '@nestjs/common';
import { StoragePort } from '../../../ports/storage/storage.port';
import { ICreateMessageCommand } from './create-message.command';
import { ChatNotFoundException } from '../../../domain/exceptions/chat/chat-not-found.exception';
import { ChatBlockedException } from '../../../domain/exceptions/chat/chat-blocked.exception';
import { AccountNotFoundException } from '../../../domain/exceptions/account/account-not-found.exception';
import { StorageQuotaExceededException } from '../../../domain/exceptions/storage/storage-quota-exceeded.exception';
import {v4 as uuid} from 'uuid';
import { MessageEntity } from '../../../domain/entities/chat/message.entity';
import { WsChatPort } from '../../../ports/ws/ws-chat.port';
import { UnitOfWorkPort } from '../../../ports/uow/unit-of-work.port';
import { READ_RESOURCES } from '../../../domain/constants/roles.constants';
import { ChatForbiddenException } from '../../../domain/exceptions/chat/chat-forbidden.exception';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { GlobalRoleRepository } from '../../../domain/repositories/user/global-role.repository';

@Injectable()
export class CreateMessageUseCase {
  constructor(
    private readonly uow: UnitOfWorkPort,
    private readonly storage: StoragePort,
    private readonly wsChatPort: WsChatPort,
  ) {}

  public async execute(command: ICreateMessageCommand) {
    //TODO: Реализовать отправку в сокеты нового сообщения

    let uploadedFileKeys: string[] = [];
    let totalNewBytes = 0;

    return this.uow
      .begin(async (uow) => {
        const chatRepo = uow.getChatRepository();
        const accountRepo = uow.getAccountRepository();
        const messageRepo = uow.getMessageRepository();
        const globalRoleRepo = uow.globalRolesRepository();


        const chat = await chatRepo.findById(command.chatId);
        if (!chat) throw new ChatNotFoundException();
        if (chat.isBlocked()) throw new ChatBlockedException();

        const isMember = chat.members.some(
          (member) => member.userId === command.senderId,
        );

        const userRoles = await globalRoleRepo.findUserRoles(
          command.senderId,
        );
        const hasGlobalReadPermission = userRoles.some((role) =>
          READ_RESOURCES.includes(role.name),
        );

        if (!isMember && !hasGlobalReadPermission) {
          throw new ChatForbiddenException();
        }

        if (command.files?.length) {
          const account = await accountRepo.findByUserId(command.senderId);
          if (!account) throw new AccountNotFoundException();

          totalNewBytes = command.files.reduce(
            (sum, f) => sum + f.buffer.length,
            0,
          );
          if (!account.canUpload(totalNewBytes))
            throw new StorageQuotaExceededException();

          for (const file of command.files) {
            const fileKey = `chat/${command.chatId}/${uuid()}`;
            await this.storage.save({
              key: fileKey,
              buffer: file.buffer,
              mimeType: file.mimeType,
            });
            uploadedFileKeys.push(fileKey);
          }

          account.addUsedBytes(totalNewBytes);
          await accountRepo.update(account.id, {
            storageUsedBytes: account.storageUsedBytes,
          });
        }

        const messageEntity = new MessageEntity(
          uuid(),
          chat.id,
          command.senderId,
          new Date(),
          new Date(),
          command.text ?? null,
          uploadedFileKeys,
        );
        const savedMessage = await messageRepo.save(messageEntity);

        chat.updatedAt = new Date();
        await chatRepo.update(chat.id, { updatedAt: chat.updatedAt });

        await this.wsChatPort.sendToChat(messageEntity);

        return savedMessage;
      })
      .catch(async (error) => {
        for (const key of uploadedFileKeys) {
          await this.storage.remove(key).catch(() => {});
        }
        throw error;
      });
  }
}

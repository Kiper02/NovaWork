import { Injectable } from '@nestjs/common';
import { BidRepository } from '../../../domain/repositories/project/bid.repository';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { MessageRepository } from '../../../domain/repositories/chat/message.repository';
import { IRejectBidCommand } from './reject-bid.command';
import { BidNotFoundException } from '../../../domain/exceptions/bid/bid-not-found.exception';
import { BidEntity, EnumBidStatus } from '../../../domain/entities/project/bid.entity';
import { ChatNotFoundException } from '../../../domain/exceptions/chat/chat-not-found.exception';
import { MessageEntity } from '../../../domain/entities/chat/message.entity';
import {v4 as uuid} from 'uuid';
import { TaskRepository } from '../../../domain/repositories/project/task.repository';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';
import {
  ChatEntity,
  EnumChatContext,
} from '../../../domain/entities/chat/chat.entity';
import { ChatBlock } from '../../../domain/value-objects/chat/chat-block.value-object';
import { EnumChatsBlockedConstants } from '../../../domain/constants/chats.constants';

@Injectable()
export class RejectBidUseCase {
  public constructor(
    private readonly bidRepository: BidRepository,
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
    private readonly taskRepository: TaskRepository
  ) {}

  public async execute(command: IRejectBidCommand) {
    const existingBid = await this.bidRepository.findById(command.bidId);
    if (!existingBid) {
      throw new BidNotFoundException();
    }

    const existingTask = await this.taskRepository.findById(existingBid.taskId);

    if(!existingTask) {
      throw new TaskNotFoundException()
    }

    const updateBidData: Partial<Omit<BidEntity, 'id' | 'createdAt'>> = {
      status: EnumBidStatus.REJECT,
    };

    const chat = await this.chatRepository.findByContextAndContextId(
      existingBid.id,
      EnumChatContext.BID,
    );
    if(!chat) {
      throw new ChatNotFoundException()
    }


    const messageEntity = new MessageEntity(
      uuid(),
      chat.id,
      existingTask?.userId,
      new Date(),
      new Date(),
      command.message ?? 'Ваш отклик отклонили',
      [],
    );

    await this.messageRepository.save(messageEntity);

    const updateChatData: Partial<Omit<ChatEntity, 'id' | 'createdAt'>> = {
      block: new ChatBlock(
        new Date(),
        existingTask.userId,
        EnumChatsBlockedConstants.BID_REJECT,
        undefined,
      ),
    };

    await this.chatRepository.update(chat.id, updateChatData);

    await this.bidRepository.update(command.bidId, updateBidData);
  }
}
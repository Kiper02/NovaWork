import { Injectable } from '@nestjs/common';
import { BidRepository } from '../../../domain/repositories/project/bid.repository';
import { ICreateBidCommand } from './create-bid.command';
import { TaskRepository } from '../../../domain/repositories/project/task.repository';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';
import { BidEntity, EnumBidStatus } from '../../../domain/entities/project/bid.entity';
import { v4 as uuid } from 'uuid';
import { ChatRepository } from '../../../domain/repositories/chat/chat.repository';
import { MessageRepository } from '../../../domain/repositories/chat/message.repository';
import {
  ChatEntity,
  EnumChatContext,
  EnumChatType,
} from '../../../domain/entities/chat/chat.entity';
import { MessageEntity } from '../../../domain/entities/chat/message.entity';

@Injectable()
export class CreateBidUseCase {
  public constructor(
    private readonly bidRepository: BidRepository,
    private readonly taskRepository: TaskRepository,
    private readonly chatRepository: ChatRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  public async execute(command: ICreateBidCommand) {
    const existingTask = await this.taskRepository.findById(command.taskId);
    if (!existingTask) {
      throw new TaskNotFoundException();
    }

    const bidEntity = new BidEntity(
      uuid(),
      command.coverLetter,
      command.amount,
      EnumBidStatus.VIEWED,
      command.userId,
      command.taskId,
      new Date(),
      new Date(),
    );

    const bid = await this.bidRepository.save(bidEntity);

    const chatEntity = new ChatEntity(
      uuid(),
      existingTask.title,
      EnumChatType.DIRECT,
      [],
      new Date(),
      new Date(),
      null,
      EnumChatContext.BID,
      bid.id,
    );

    chatEntity.addMember(bid.userId)
    chatEntity.addMember(existingTask.userId)

    await this.chatRepository.save(chatEntity);

    const messageEntity = new MessageEntity(
      uuid(),
      chatEntity.id,
      command.userId,
      new Date(),
      new Date(),
      command.coverLetter,
      [],
    );

    await this.messageRepository.save(messageEntity);


    return bid;
  }
}
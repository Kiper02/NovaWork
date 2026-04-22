import { Injectable } from '@nestjs/common';
import { NotificationPort } from '../../../ports/notification/notification.port';
import { BidRepository } from '../../../domain/repositories/project/bid.repository';
import { IAcceptBidCommand } from './accept-bid.command';
import { BidNotFoundException } from '../../../domain/exceptions/bid/bid-not-found.exception';
import { EnumBidStatus } from '../../../domain/entities/project/bid.entity';
import {
  EnumNotificationType,
  NotificationEntity,
} from '../../../domain/entities/shared/notification.entity';
import { v4 as uuid } from 'uuid';
import { TaskRepository } from '../../../domain/repositories/project/task.repository';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { UserNotFoundException } from '../../../domain/exceptions/user/user-not-found.exception';

@Injectable()
export class AcceptBidUseCase {
  public constructor(
    private readonly bidRepository: BidRepository,
    private readonly notificationPort: NotificationPort,
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: IAcceptBidCommand) {
    const bid = await this.bidRepository.findById(command.bidId);
    if (!bid) {
      throw new BidNotFoundException();
    }

    const task = await this.taskRepository.findById(bid.taskId);
    if(!task) {
      throw new TaskNotFoundException()
    }

    const creatorTask = await this.userRepository.findById(task.userId);
    if(!creatorTask) {
      throw new UserNotFoundException('userId', task.userId);
    }

    await this.bidRepository.update(bid.id, { status: EnumBidStatus.ACCEPTED });


    const notificationEntity = new NotificationEntity(
      uuid(),
      'Отклик принят',
      'Какой то текст',
      EnumNotificationType.BID_ACCEPTED,
      {
        bidId: bid.id,
        username: creatorTask.username,
        taskTitle: task.title,
        taskId: task.id
      },
      new Date(),
      new Date(),
    );

    await this.notificationPort.send(command.user.id, command.user.email, notificationEntity);
  }
}
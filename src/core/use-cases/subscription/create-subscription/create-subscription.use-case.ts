import { v4 as uuid } from 'uuid';
import { SubscriptionRepository } from '../../../domain/repositories/shared/subscription.repository';
import { ICreateSubscriptionCommand } from './create-subscription.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateSubscriptionUseCase {
  public constructor(
    public readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  public async execute(command: ICreateSubscriptionCommand) {
    //TODO:
    // - Вычисление startDate и endDate
    // - Оплата подписки через ссылку банка
    // - Создание подписки
  }
}
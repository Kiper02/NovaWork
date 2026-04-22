import { Injectable } from '@nestjs/common';
import { EmailStrategyPort } from '../../../../core/ports/email-sender/email-strategy.port';
import { render } from '@react-email/components';
import BidAcceptedTemplate from '../templates/bid-accepted.template';
import { ConfigService } from '@nestjs/config';
import { EmailSenderPort } from '../../../../core/ports/email-sender/email-sender.port';

@Injectable()
export class AcceptedBidStrategy implements EmailStrategyPort {
  public constructor(
    private readonly emailSender: EmailSenderPort,
    private readonly configService: ConfigService,
  ) {}

  public async execute(
    to: string,
    context: Record<string, any>,
  ): Promise<void> {
    const baseUrl = this.configService.getOrThrow('CLIENT_URL');
    const taskUrl = `${baseUrl}/tasks/${context.taskId}`;

    const html = await render(
      BidAcceptedTemplate({
        bidId: context.bidId,
        username: context.username,
        taskTitle: context.taskTitle,
        taskUrl: taskUrl,
      }),
    );
    return this.emailSender.send(to, 'Отклик принят', html);
  }
}

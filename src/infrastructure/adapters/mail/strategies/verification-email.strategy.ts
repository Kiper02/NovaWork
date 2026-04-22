import { Injectable } from '@nestjs/common';
import { EmailStrategyPort } from '../../../../core/ports/email-sender/email-strategy.port';
import { render } from '@react-email/components';
import VerificationTemplate from '../templates/verification.template';
import { EmailSenderPort } from '../../../../core/ports/email-sender/email-sender.port';

@Injectable()
export class VerificationEmailStrategy implements EmailStrategyPort {
  public constructor(private readonly emailSender: EmailSenderPort) {}

  public async execute(
    to: string,
    context: Record<string, any>,
  ): Promise<void> {
    const html = await render(VerificationTemplate({ code: context.code }));
    return this.emailSender.send(to, 'Верификация аккаунта', html);
  }
}

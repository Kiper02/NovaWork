import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailSenderPort } from '../../../core/ports/email-sender/email-sender.port';

@Injectable()
export class MailService implements EmailSenderPort {
  public constructor(
    private readonly mailerService: MailerService,
  ) {}
  public async send(to: string, subject: string, template: string): Promise<void> {
    return this.mailerService.sendMail({
      to: to,
      subject: subject,
      template: template
    })
  }
}

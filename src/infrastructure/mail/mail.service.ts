import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailSenderPort } from '../../core/ports/email-sender.port';

@Injectable()
export class MailService implements EmailSenderPort {
  public constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  public async sendVerificationCode() {}
}

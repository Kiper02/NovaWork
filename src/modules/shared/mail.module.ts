import { Global, Module } from '@nestjs/common';
import { EmailSenderPort } from '../../core/ports/email-sender/email-sender.port';
import { MailService } from '../../infrastructure/adapters/mail/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import getMailerConfig from '../../infrastructure/config/mailer.config';
import { VerificationEmailStrategy } from '../../infrastructure/adapters/mail/strategies/verification-email.strategy';
import { AcceptedBidStrategy } from '../../infrastructure/adapters/mail/strategies/accepted-bid.strategy';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getMailerConfig,
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: EmailSenderPort,
      useClass: MailService,
    },
    VerificationEmailStrategy,
    AcceptedBidStrategy,
  ],
  exports: [EmailSenderPort, VerificationEmailStrategy, AcceptedBidStrategy],
})
export class MailModule {}

import { Module } from '@nestjs/common';
import { AuthController } from '../presentation/controllers/auth.controller';
import { RegisterUseCase } from '../core/use-cases/auth/register/register.use-case';
import { LoginUseCase } from '../core/use-cases/auth/login/login.use-case';
import { MailService } from '../infrastructure/mail/mail.service';
import { EmailSenderPort } from '../core/ports/email-sender.port';
import { PasswordHasherPort } from '../core/ports/password-hasher.port';
import { Argon2PasswordHasher } from '../infrastructure/security/argon2-password-hasher.service';
import { VerificationCodeGeneratorPort } from '../core/ports/verification-code-generator.port';
import { VerificationCodeGenerator } from '../infrastructure/security/verification-code-generator.service';
import { MailModule } from '../infrastructure/mail/mail.module';
import { UserModule } from './user.module';

@Module({
  imports: [MailModule, UserModule],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
    {
      provide: EmailSenderPort,
      useClass: MailService,
    },
    {
      provide: PasswordHasherPort,
      useClass: Argon2PasswordHasher,
    },
    {
      provide: VerificationCodeGeneratorPort,
      useClass: VerificationCodeGenerator,
    },
  ],
  exports: [],
})
export class AuthModule {}

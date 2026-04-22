import { Module } from '@nestjs/common';
import { AuthController } from '../../presentation/controllers/auth.controller';
import { RegisterUseCase } from '../../core/use-cases/auth/register/register.use-case';
import { LoginUseCase } from '../../core/use-cases/auth/login/login.use-case';
import { PasswordHasherPort } from '../../core/ports/password-hasher/password-hasher.port';
import { Argon2PasswordHasher } from '../../infrastructure/adapters/security/argon2-password-hasher.service';
import { VerificationCodeGeneratorPort } from '../../core/ports/verification-code-generator/verification-code-generator.port';
import { VerificationCodeGenerator } from '../../infrastructure/adapters/security/verification-code-generator.service';
import { MailModule } from '../shared/mail.module';

@Module({
  imports: [MailModule],
  controllers: [AuthController],
  providers: [
    RegisterUseCase,
    LoginUseCase,
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

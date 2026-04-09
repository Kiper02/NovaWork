import { EmailSenderPort } from '../../../ports/email-sender.port';
import { VerificationCodeGeneratorPort } from '../../../ports/verification-code-generator.port';
import { UserEntity } from '../../../domain/entities/user.entity';
import { IRegisterCommand } from './register.command';
import { CreateUserUseCase } from '../../user/create-user/create-user.use-case';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUseCase {
  public constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly emailSenderPort: EmailSenderPort,
    private readonly verificationCodeGeneratorPort: VerificationCodeGeneratorPort,
  ) {
  }

  public async execute(command: IRegisterCommand): Promise<UserEntity> {
    const user = await this.createUserUseCase.execute(command);
    const code = this.verificationCodeGeneratorPort.generateCode();
    await this.emailSenderPort.sendVerificationCode(user.email, code);
    return user;
  }
}
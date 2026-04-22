import { VerificationCodeGeneratorPort } from '../../../ports/verification-code-generator/verification-code-generator.port';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { IRegisterCommand } from './register.command';
import { CreateUserUseCase } from '../../user/create-user/create-user.use-case';
import { Injectable } from '@nestjs/common';
import { VerificationEmailStrategy } from '../../../../infrastructure/adapters/mail/strategies/verification-email.strategy';

@Injectable()
export class RegisterUseCase {
  public constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly verificationEmailStrategy: VerificationEmailStrategy,
    private readonly verificationCodeGeneratorPort: VerificationCodeGeneratorPort,
  ) {}

  public async execute(command: IRegisterCommand): Promise<UserEntity> {
    const user = await this.createUserUseCase.execute(command);
    const code = this.verificationCodeGeneratorPort.generateCode();
    // await this.verificationEmailStrategy.execute(user.email, { code });
    return user;
  }
}
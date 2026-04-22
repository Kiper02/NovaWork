import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { PasswordHasherPort } from '../../../ports/password-hasher/password-hasher.port';
import { ILoginCommand } from './login.command';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { UserNotFoundException } from '../../../domain/exceptions/user/user-not-found.exception';
import { InvalidCredentialsException } from '../../../domain/exceptions/auth/invalid-credentials-exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginUseCase {
  public constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherPort: PasswordHasherPort,
  ) {}

  public async execute(command: ILoginCommand): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new UserNotFoundException('email', command.email);
    }

    const isValid = await this.passwordHasherPort.verify(
      user.passwordHash,
      command.password,
    );
    if (!isValid) throw new InvalidCredentialsException();

    return user;
  }
}

import { UserRepository } from '../../../domain/repositories/user.repository';
import { UserEntity } from '../../../domain/entities/user.entity';
import { PasswordHasherPort } from '../../../ports/password-hasher.port';
import { AccountRepository } from '../../../domain/repositories/account.repository';
import { ProfileRepository } from '../../../domain/repositories/profile.repository';
import { UserCreationService } from '../../../domain/services/user/user-creation.service';
import { UserUniquenessService } from '../../../domain/services/user/user-uniqueness.service';
import { ICreateUserCommand } from './create-user.command';
import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../../domain/repositories/workspace.repository';


@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherPort: PasswordHasherPort,
    private readonly accountRepository: AccountRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly userCreationService: UserCreationService,
    private readonly userUniquenessService: UserUniquenessService,
    private readonly workspaceRepository: WorkspaceRepository
  ) {
  }

  async execute(command: ICreateUserCommand): Promise<UserEntity> {
    await this.userUniquenessService.checkUniqueness(
      command.email,
      command.username,
    );

    const hashedPassword = await this.passwordHasherPort.hash(command.password);
    const entities = this.userCreationService.create({
      email: command.email,
      username: command.username,
      passwordHash: hashedPassword,
      firstName: command.firstName,
      middleName: command.middleName,
      lastName: command.lastName,
    });

    await this.userRepository.save(entities.user);
    await this.profileRepository.save(entities.profile);
    await this.accountRepository.save(entities.account);
    await this.workspaceRepository.save(entities.workspace);

    return entities.user;
  }
}
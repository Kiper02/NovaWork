import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { UserEntity } from '../../../domain/entities/user/user.entity';
import { PasswordHasherPort } from '../../../ports/password-hasher/password-hasher.port';
import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { ProfileRepository } from '../../../domain/repositories/user/profile.repository';
import { UserCreationService } from '../../../domain/services/user/user-creation.service';
import { UserUniquenessService } from '../../../domain/services/user/user-uniqueness.service';
import { ICreateUserCommand } from './create-user.command';
import { Injectable } from '@nestjs/common';
import { WorkspaceRepository } from '../../../domain/repositories/project/workspace.repository';
import { PlatformSettingsRepository } from '../../../domain/repositories/shared/platform-settings.repository';
import {
  PlatformSettingsNotFoundException
} from '../../../domain/exceptions/platform-settings/platform-settings-not-found.exception';


@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasherPort: PasswordHasherPort,
    private readonly accountRepository: AccountRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly userCreationService: UserCreationService,
    private readonly userUniquenessService: UserUniquenessService,
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly platformSettingsRepository: PlatformSettingsRepository,
  ) {}

  async execute(command: ICreateUserCommand): Promise<UserEntity> {
    await this.userUniquenessService.checkUniqueness(
      command.email,
      command.username,
    );

    const hashedPassword = await this.passwordHasherPort.hash(command.password);
    const platformSettings = await this.platformSettingsRepository.get();
    if (!platformSettings) {
      throw new PlatformSettingsNotFoundException();
    }

    const entities = this.userCreationService.create({
      email: command.email,
      username: command.username,
      passwordHash: hashedPassword,
      firstName: command.firstName,
      middleName: command.middleName,
      lastName: command.lastName,
      storageQuotaBytes: platformSettings.settings.storageQuotas.freeBytes,
    });

    await this.userRepository.save(entities.user);
    await this.profileRepository.save(entities.profile);
    await this.accountRepository.save(entities.account);
    await this.workspaceRepository.save(entities.workspace);

    return entities.user;
  }
}
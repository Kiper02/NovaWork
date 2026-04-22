import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { ICreateAccountCommand } from './create-account.command';
import { AccountEntity } from '../../../domain/entities/finance/account.entity';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { UserNotFoundException } from '../../../domain/exceptions/user/user-not-found.exception';
import { PlatformSettingsRepository } from '../../../domain/repositories/shared/platform-settings.repository';
import {
  PlatformSettingsNotFoundException
} from '../../../domain/exceptions/platform-settings/platform-settings-not-found.exception';

@Injectable()
export class CreateAccountUseCase {
  public constructor(
    public readonly accountRepository: AccountRepository,
    public readonly userRepository: UserRepository,
    public readonly platformSettingsRepository: PlatformSettingsRepository
  ) {}

  public async execute(command: ICreateAccountCommand) {
    const existingUser = await this.userRepository.findById(command.userId);
    if (!existingUser) {
      throw new UserNotFoundException('userId', command.userId);
    }

    const settings = await this.platformSettingsRepository.get()
    if(!settings) {
      throw new PlatformSettingsNotFoundException()
    }

    const accountEntity = new AccountEntity(
      uuid(),
      existingUser.id,
      0,
      0,
      settings?.settings.storageQuotas.freeBytes,
      BigInt(0),
    );
    return this.accountRepository.save(accountEntity);
  }
}
import { v4 as uuid } from 'uuid';
import { ICreateProfileCommand } from './create-profile.command';
import { ProfileEntity } from '../../../domain/entities/user/profile.entity';
import { ProfileRepository } from '../../../domain/repositories/user/profile.repository';
import { Injectable } from '@nestjs/common';
import { NotificationSettingsValueObject } from '../../../domain/value-objects/profile/notification-settings.value-object';

@Injectable()
export class CreateProfileUseCase {
  public constructor(public readonly profileRepository: ProfileRepository) {}

  public async execute(command: ICreateProfileCommand) {
    const profileEntity = new ProfileEntity(
      uuid(),
      command.firstName,
      command.middleName,
      command.lastName,
      command.userId,
      null,
      command.about ?? null,
      command.role ?? null,
      NotificationSettingsValueObject.default(),
      new Date(),
      new Date(),
    );
    return this.profileRepository.save(profileEntity);
  }
}

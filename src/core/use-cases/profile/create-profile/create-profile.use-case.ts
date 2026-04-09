import { v4 as uuid } from 'uuid';
import { ICreateProfileCommand } from './create-profile.command';
import { ProfileEntity } from '../../../domain/entities/profile.entity';
import { ProfileRepository } from '../../../domain/repositories/profile.repository';
import { Injectable } from '@nestjs/common';

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
      new Date(),
      new Date(),
    );
    return this.profileRepository.save(profileEntity);
  }
}
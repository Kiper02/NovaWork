import { ProfileRepository } from '../../../domain/repositories/user/profile.repository';
import { IFindMyProfileCommand } from './find-my-profile.command';
import { ProfileNotFoundException } from '../../../domain/exceptions/profile/profile-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindMyProfileUseCase {
  public constructor(public profileRepository: ProfileRepository) {}

  public async execute(command: IFindMyProfileCommand) {
    const profile = await this.profileRepository.findByUserId(command.userId);

    if (!profile) {
      throw new ProfileNotFoundException();
    }

    return profile;
  }
}
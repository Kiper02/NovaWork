import { ProfileRepository } from '../../../domain/repositories/profile.repository';
import { IUpdateProfileCommand } from './update-profile.command';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UpdateProfileUseCase {
  public constructor(private readonly profileRepository: ProfileRepository) {}

  public async execute(command: IUpdateProfileCommand) {
    return this.profileRepository.update(command.id, command);
  }
}
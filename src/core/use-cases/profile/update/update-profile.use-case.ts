import { ProfileRepository } from '../../../domain/repositories/user/profile.repository';
import { IUpdateProfileCommand } from './update-profile.command';
import { Injectable } from '@nestjs/common';
import { AccessControlService } from '../../../domain/services/authorization/access-control.service';
import { ProfileNotFoundException } from '../../../domain/exceptions/profile/profile-not-found.exception';
import { UPDATE_RESOURCES } from '../../../domain/constants/roles.constants';
import { ProfileUpdateForbiddenException } from '../../../domain/exceptions/profile/profile-update-forbidden.exception';
import { StoragePort } from '../../../ports/storage/storage.port';
import { ProfileEntity } from '../../../domain/entities/user/profile.entity';
import { FileProcessorService } from '../../../domain/services/files/file-processor.service';

@Injectable()
export class UpdateProfileUseCase {
  public constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly accessControlService: AccessControlService,
    private readonly storagePort: StoragePort,
    private readonly fileProcessorService: FileProcessorService,
  ) {}

  public async execute(command: IUpdateProfileCommand) {
    const existingProfile = await this.profileRepository.findById(command.id);
    if (!existingProfile) {
      throw new ProfileNotFoundException();
    }

    await this.accessControlService.checkAccessOrThrow(
      command.userId,
      UPDATE_RESOURCES,
      existingProfile.userId,
      new ProfileUpdateForbiddenException(),
    );

    const updateData: Partial<ProfileEntity> = {
      firstName: command.firstName,
      middleName: command.middleName,
      lastName: command.lastName,
      about: command.about,
      role: command.role,
    };

    if (command.avatar) {
      if (existingProfile.avatar) {
        await this.storagePort.remove(existingProfile.avatar);
      }
      updateData.avatar = await this.fileProcessorService.processImage(
        command.avatar.buffer,
        'avatars',
      );
    }

    return this.profileRepository.update(command.id, updateData);
  }
}

import { PaginationParamsValueObject } from '../../../domain/value-objects/shared/pagination-params.value-object';
import { ProfileRepository } from '../../../domain/repositories/user/profile.repository';
import { IFindAllProfileCommand } from './find-all-profile.command';
import { ProfileFiltersValueObject } from '../../../domain/value-objects/profile/profile-filters.value.object';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindAllProfileUseCase {
  public constructor(private readonly profileRepository: ProfileRepository) {}

  public async execute(command: IFindAllProfileCommand) {
    const params = new ProfileFiltersValueObject(command.userId);

    const pagination = new PaginationParamsValueObject(
      command.page,
      command.limit,
    );
    return this.profileRepository.findAll(params, pagination);
  }
}
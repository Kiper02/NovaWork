import { Module } from '@nestjs/common';
import { ProfilesController } from '../../presentation/controllers/profiles.controller';
import { CreateProfileUseCase } from '../../core/use-cases/profile/create-profile/create-profile.use-case';
import { UpdateProfileUseCase } from '../../core/use-cases/profile/update/update-profile.use-case';
import { FindAllProfileUseCase } from '../../core/use-cases/profile/find-all/find-all-profile.use-case';
import { FindMyProfileUseCase } from '../../core/use-cases/profile/find-my/find-my-profile.use-case';


@Module({
  controllers: [ProfilesController],
  providers: [
    CreateProfileUseCase,
    UpdateProfileUseCase,
    FindAllProfileUseCase,
    FindMyProfileUseCase,
  ],
})
export class ProfileModule {}

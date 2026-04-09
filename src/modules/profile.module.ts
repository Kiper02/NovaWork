import { Module } from '@nestjs/common';
import { ProfilesController } from '../presentation/controllers/profiles.controller';
import { CreateProfileUseCase } from '../core/use-cases/profile/create-profile/create-profile.use-case';
import { UpdateProfileUseCase } from '../core/use-cases/profile/update/update-profile.use-case';
import { FindAllProfileUseCase } from '../core/use-cases/profile/find-all/find-all-profile.use-case';
import { FindMyProfileUseCase } from '../core/use-cases/profile/find-my/find-my-profile.use-case';
import { ProfileRepository } from '../core/domain/repositories/profile.repository';
import { ProfileRepositoryImpl } from '../infrastructure/database/repositories/profile.repository.impl';
import { UserRepository } from '../core/domain/repositories/user.repository';
import { UserRepositoryImpl } from '../infrastructure/database/repositories/user.repository.impl';


@Module({
  controllers: [ProfilesController],
  providers: [
    CreateProfileUseCase,
    UpdateProfileUseCase,
    FindAllProfileUseCase,
    FindMyProfileUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: ProfileRepository,
      useClass: ProfileRepositoryImpl,
    },
  ],
  exports: [],
})
export class ProfileModule {}

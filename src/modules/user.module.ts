import { Global, Module } from '@nestjs/common';
import { UsersController } from '../presentation/controllers/users.controller';
import { CreateUserUseCase } from '../core/use-cases/user/create-user/create-user.use-case';
import { UserRepository } from '../core/domain/repositories/user.repository';
import { UserRepositoryImpl } from '../infrastructure/database/repositories/user.repository.impl';
import { PasswordHasherPort } from '../core/ports/password-hasher.port';
import { Argon2PasswordHasher } from '../infrastructure/security/argon2-password-hasher.service';
import { AccountRepository } from '../core/domain/repositories/account.repository';
import { AccountRepositoryImpl } from '../infrastructure/database/repositories/account.repository.impl';
import { ProfileRepository } from '../core/domain/repositories/profile.repository';
import { ProfileRepositoryImpl } from '../infrastructure/database/repositories/profile.repository.impl';
import { UserCreationService } from '../core/domain/services/user/user-creation.service';
import { UserUniquenessService } from '../core/domain/services/user/user-uniqueness.service';
import { FindMeUseCase } from '../core/use-cases/user/find-me/find-me.use-case';
import { WorkspaceModule } from './workspace.module';

@Global()
@Module({
  imports: [WorkspaceModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindMeUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PasswordHasherPort,
      useClass: Argon2PasswordHasher,
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: ProfileRepository,
      useClass: ProfileRepositoryImpl,
    },
    {
      provide: UserCreationService,
      useClass: UserCreationService,
    },
    {
      provide: UserUniquenessService,
      useClass: UserUniquenessService,
    },
  ],
  exports: [CreateUserUseCase, UserRepository],
})
export class UserModule {}

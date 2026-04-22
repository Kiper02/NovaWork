import { Global, Module } from '@nestjs/common';
import { UsersController } from '../../presentation/controllers/users.controller';
import { CreateUserUseCase } from '../../core/use-cases/user/create-user/create-user.use-case';
import { PasswordHasherPort } from '../../core/ports/password-hasher/password-hasher.port';
import { Argon2PasswordHasher } from '../../infrastructure/adapters/security/argon2-password-hasher.service';
import { UserCreationService } from '../../core/domain/services/user/user-creation.service';
import { UserUniquenessService } from '../../core/domain/services/user/user-uniqueness.service';
import { FindMeUseCase } from '../../core/use-cases/user/find-me/find-me.use-case';
import { WorkspaceModule } from '../project/workspace.module';
import { NotificationModule } from '../shared/notification.module';

@Global()
@Module({
  imports: [WorkspaceModule, NotificationModule],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    FindMeUseCase,
    {
      provide: PasswordHasherPort,
      useClass: Argon2PasswordHasher,
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
  exports: [CreateUserUseCase],
})
export class UserModule {}

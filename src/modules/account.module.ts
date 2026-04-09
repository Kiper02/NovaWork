import { Module } from '@nestjs/common';
import { AccountsController } from '../presentation/controllers/accounts.controller';
import { CreateAccountUseCase } from '../core/use-cases/account/create-account/create-account.use-case';
import { UpdateAccountUseCase } from '../core/use-cases/account/update/update-account.use-case';
import { FindAllAccountUseCase } from '../core/use-cases/account/find-all/find-all-account.use-case';
import { FindMyAccountUseCase } from '../core/use-cases/account/find-my/find-my-account.use-case';
import { UserRepository } from '../core/domain/repositories/user.repository';
import { UserRepositoryImpl } from '../infrastructure/database/repositories/user.repository.impl';
import { AccountRepository } from '../core/domain/repositories/account.repository';
import { AccountRepositoryImpl } from '../infrastructure/database/repositories/account.repository.impl';

@Module({
  controllers: [AccountsController],
  providers: [
    CreateAccountUseCase,
    UpdateAccountUseCase,
    FindAllAccountUseCase,
    FindMyAccountUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
  ],
  exports: [],
})
export class AccountModule {}

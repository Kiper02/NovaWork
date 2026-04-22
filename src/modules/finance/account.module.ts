import { Module } from '@nestjs/common';
import { AccountsController } from '../../presentation/controllers/accounts.controller';
import { CreateAccountUseCase } from '../../core/use-cases/account/create-account/create-account.use-case';
import { UpdateAccountUseCase } from '../../core/use-cases/account/update/update-account.use-case';
import { FindAllAccountUseCase } from '../../core/use-cases/account/find-all/find-all-account.use-case';
import { FindMyAccountUseCase } from '../../core/use-cases/account/find-my/find-my-account.use-case';

@Module({
  controllers: [AccountsController],
  providers: [
    CreateAccountUseCase,
    UpdateAccountUseCase,
    FindAllAccountUseCase,
    FindMyAccountUseCase,
  ],
})
export class AccountModule {}

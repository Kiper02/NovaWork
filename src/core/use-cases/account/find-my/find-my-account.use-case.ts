import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { IFindMyAccountCommand } from './find-my-account.command';
import { AccountNotFoundException } from '../../../domain/exceptions/account/account-not-found.exception';
import { Injectable } from '@nestjs/common';

@Injectable()
export class FindMyAccountUseCase {
  public constructor(public accountRepository: AccountRepository) {}

  public async execute(command: IFindMyAccountCommand) {
    const account = await this.accountRepository.findByUserId(command.userId);

    if (!account) {
      throw new AccountNotFoundException();
    }

    return account;
  }
}
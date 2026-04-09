import { AccountRepository } from '../../../domain/repositories/account.repository';
import { ICreateAccountCommand } from './create-account.command';
import { AccountEntity } from '../../../domain/entities/account.entity';
import { v4 as uuid } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateAccountUseCase {
  public constructor(public readonly accountRepository: AccountRepository) {}

  public async execute(command: ICreateAccountCommand) {
    const accountEntity = new AccountEntity(uuid(), command.userId, 0, 0);
    return this.accountRepository.save(accountEntity);
  }
}
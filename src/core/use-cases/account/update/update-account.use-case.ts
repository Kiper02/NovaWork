import { AccountRepository } from '../../../domain/repositories/finance/account.repository';
import { IUpdateAccountCommand } from './update-account.command';
import { UserRepository } from '../../../domain/repositories/user/user.repository';
import { UserNotFoundException } from '../../../domain/exceptions/user/user-not-found.exception';
import { Injectable } from '@nestjs/common';


@Injectable()
export class UpdateAccountUseCase {
  public constructor(
    private readonly accountRepository: AccountRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async execute(command: IUpdateAccountCommand) {
    const existingUser = await this.userRepository.findById(command.userId);
    if(!existingUser) {
      throw new UserNotFoundException('userId', command.userId);
    }

    return this.accountRepository.update(existingUser.id, command);
  }
}
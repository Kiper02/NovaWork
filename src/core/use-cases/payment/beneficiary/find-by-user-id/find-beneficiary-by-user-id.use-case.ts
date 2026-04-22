import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../../../domain/repositories/finance/account.repository';
import { BeneficiaryRepository } from '../../../../domain/repositories/finance/beneficiary.repository';
import { IFindBeneficiaryByUserIdCommand } from './find-beneficiary-by-user-id.command';
import { AccountNotFoundException } from '../../../../domain/exceptions/account/account-not-found.exception';

@Injectable()
export class FindBeneficiaryByUserIdUseCase {
  public constructor(
    private readonly accountRepository: AccountRepository,
    private readonly beneficiaryRepository: BeneficiaryRepository
  ) {
  }

  public async execute(command: IFindBeneficiaryByUserIdCommand) {
    const account = await this.accountRepository.findByUserId(command.userId);
    if (!account) {
      throw new AccountNotFoundException()
    }

    return this.beneficiaryRepository.findByAccountId(account.id);
  }
}
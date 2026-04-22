import { Injectable } from '@nestjs/common';
import { BankDetailsRepository } from '../../../../domain/repositories/finance/bank-details.repository';
import { IFindMyBankDetailsCommand } from './find-my-bank-details.command';

@Injectable()
export class FindMyBankDetailsUseCase {
  public constructor(
    private readonly bankDetailsRepository: BankDetailsRepository,
  ) {}

  public async execute(command: IFindMyBankDetailsCommand) {
    return this.bankDetailsRepository.findByUserId(command.userId);
  }
}
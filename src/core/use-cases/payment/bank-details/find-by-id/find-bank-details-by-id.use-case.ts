import { Injectable } from '@nestjs/common';
import { BankDetailsRepository } from '../../../../domain/repositories/finance/bank-details.repository';
import { IFindBankDetailsByIdCommand } from './find-bank-details-by-id.command';
import {
  BankDetailsNotFoundException
} from '../../../../domain/exceptions/bank-details/bank-details-not-found.exception';

@Injectable()
export class FindBankDetailsByIdUseCase {
  public constructor(
    private readonly bankDetailsRepository: BankDetailsRepository
  ) {
  }

  public async execute(command: IFindBankDetailsByIdCommand) {
    const bankDetails = await this.bankDetailsRepository.findById(command.bankDetailsId);

    if (!bankDetails) {
      throw new BankDetailsNotFoundException()
    }

    return bankDetails;
  }
}
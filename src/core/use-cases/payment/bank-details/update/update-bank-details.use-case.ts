import { Injectable } from '@nestjs/common';
import { BankDetailsRepository } from '../../../../domain/repositories/finance/bank-details.repository';
import { IUpdateBankDetailsCommand } from './update-bank-details.command';
import {
  BankDetailsNotFoundException
} from '../../../../domain/exceptions/bank-details/bank-details-not-found.exception';

@Injectable()
export class UpdateBankDetailsUseCase {
  public constructor(
    private readonly bankDetailsRepository: BankDetailsRepository,
  ) {
  }

  public async execute(command: IUpdateBankDetailsCommand) {
    const bankDetails = await this.bankDetailsRepository.findById(command.bankDetailsId);
    if (!bankDetails){
      throw new BankDetailsNotFoundException();
    }

    // TODO: Реализовать запрос на обновление в сам банк

    return await this.bankDetailsRepository.update(command.bankDetailsId, command);
  }
}
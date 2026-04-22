import { Injectable } from '@nestjs/common';
import { BankDetailsRepository } from '../../../../domain/repositories/finance/bank-details.repository';
import { IDeleteBankDetailsCommand } from './delete-bank-details.command';
import {
  BankDetailsNotFoundException
} from '../../../../domain/exceptions/bank-details/bank-details-not-found.exception';

@Injectable()
export class DeleteBankDetailsUseCase {
  public constructor(
    private readonly bankDetailsRepository: BankDetailsRepository
  ) {
  }

  public async execute(command: IDeleteBankDetailsCommand) {
    const bankDetails = await this.bankDetailsRepository.findById(command.bankDetailsId);

    if (!bankDetails) {
      throw new BankDetailsNotFoundException();
    }

    //TODO: Реализовать логику удаления и отправку запроса в банк

    return bankDetails;
  }
}
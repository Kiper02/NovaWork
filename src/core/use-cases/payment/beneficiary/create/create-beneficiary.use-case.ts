import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../../../../domain/repositories/finance/account.repository';
import { BeneficiaryRepository } from '../../../../domain/repositories/finance/beneficiary.repository';
import { ICreateBeneficiaryCommand } from './create-beneficiary.command';
import { AccountNotFoundException } from '../../../../domain/exceptions/account/account-not-found.exception';
import { BeneficiaryPort } from '../../../../ports/bank-payment/beneficiary/beneficiary.port';
import { BeneficiaryEntity } from '../../../../domain/entities/finance/beneficiary.entity';
import {v4 as uuid} from 'uuid';
import {
  BeneficiaryCreationFailedException
} from '../../../../domain/exceptions/beneficiary/beneficiary-creation-failed.exception';

@Injectable()
export class CreateBeneficiaryUseCase {
  public constructor(
    private readonly accountRepository: AccountRepository,
    private readonly beneficiaryRepository: BeneficiaryRepository,
    private readonly beneficiaryPort: BeneficiaryPort
  ) {}

  public async execute(command: ICreateBeneficiaryCommand) {
   try {
     const account = await this.accountRepository.findByUserId(command.userId);
     if (!account) {
       throw new AccountNotFoundException();
     }

     const externalBeneficiary =
       await this.beneficiaryPort.createBeneficiary(command.type, command.details);

     const beneficiaryEntity = new BeneficiaryEntity(
       uuid(),
       account.id,
       command.type,
       externalBeneficiary.beneficiaryId,
       command.details,
       new Date(),
       new Date(),
     );

     return this.beneficiaryRepository.save(beneficiaryEntity);
   } catch (e) {
     throw new BeneficiaryCreationFailedException(
       'Beneficiary creation failed',
     );
   }
  }
}
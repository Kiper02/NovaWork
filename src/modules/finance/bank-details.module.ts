import { Module } from '@nestjs/common';
import { BankDetailsController } from '../../presentation/controllers/bank-details.controller';
import {
  CreateBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/create/create-bank-details.use-case';
import {
  UpdateBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/update/update-bank-details.use-case';
import {
  FindAllBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/find-all/find-all-bank-details.use-case';
import {
  FindBankDetailsByIdUseCase
} from '../../core/use-cases/payment/bank-details/find-by-id/find-bank-details-by-id.use-case';
import {
  DeleteBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/delete/delete-bank-details.use-case';
import {
  FindMyBankDetailsUseCase
} from '../../core/use-cases/payment/bank-details/find-my/find-my-bank-details.use-case';

@Module({
  controllers: [BankDetailsController],
  providers: [
    CreateBankDetailsUseCase,
    UpdateBankDetailsUseCase,
    FindAllBankDetailsUseCase,
    FindBankDetailsByIdUseCase,
    FindMyBankDetailsUseCase,
    UpdateBankDetailsUseCase,
    DeleteBankDetailsUseCase,
  ],
})
export class BankDetailsModule {}

import { Module } from '@nestjs/common';
import { BeneficiaryController } from '../../presentation/controllers/beneficiary.controller';
import { CreateBeneficiaryUseCase } from '../../core/use-cases/payment/beneficiary/create/create-beneficiary.use-case';
import { UpdateBeneficiaryUseCase } from '../../core/use-cases/payment/beneficiary/update/update-beneficiary.use-case';
import {
  FindAllBeneficiaryUseCase
} from '../../core/use-cases/payment/beneficiary/find-all/find-all-beneficiary.use-case';
import {
  FindBeneficiaryByUserIdUseCase
} from '../../core/use-cases/payment/beneficiary/find-by-user-id/find-beneficiary-by-user-id.use-case';
import { RemoveBeneficiaryUseCase } from '../../core/use-cases/payment/beneficiary/remove/remove-beneficiary.use-case';

@Module({
  controllers: [BeneficiaryController],
  providers: [
    CreateBeneficiaryUseCase,
    UpdateBeneficiaryUseCase,
    FindAllBeneficiaryUseCase,
    FindBeneficiaryByUserIdUseCase,
    RemoveBeneficiaryUseCase,
  ],
})
export class BeneficiaryModule {}

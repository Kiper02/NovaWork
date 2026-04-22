import { Module } from '@nestjs/common';
import { ContractController } from '../../presentation/controllers/contract.controller';
import { CreateContractUseCase } from '../../core/use-cases/contract/create/create-contract.use-case';
import { UpdateContractUseCase } from '../../core/use-cases/contract/update/update-contract.use-case';
import { FindAllContractUseCase } from '../../core/use-cases/contract/find-all/find-all-contract.use-case';
import { FindByIdContractUseCase } from '../../core/use-cases/contract/find-by-id/find-by-id-contract.use-case';

@Module({
  controllers: [ContractController],
  providers: [
    CreateContractUseCase,
    UpdateContractUseCase,
    FindAllContractUseCase,
    FindByIdContractUseCase,
  ],
})
export class ContractModule {}

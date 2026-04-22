import { Injectable } from '@nestjs/common';
import { UnitOfWorkPort } from '../../../ports/uow/unit-of-work.port';
import { ICreateContractCommand } from './create-contract.command';
import {
  ContractEntity,
  EnumContractStatus,
} from '../../../domain/entities/project/contract.entity';
import { v4 as uuid } from 'uuid';
import { ContractMissingTargetException } from '../../../domain/exceptions/contract/contract-missing-target.exception';
import { TaskNotFoundException } from '../../../domain/exceptions/task/task-not-found.exception';
import { ServiceNotFoundException } from '../../../domain/exceptions/service/service-not-found.exception';
import { ContractAmbiguousException } from '../../../domain/exceptions/contract/contract-ambiguous.exception';
import { PlatformSettingsNotFoundException } from '../../../domain/exceptions/platform-settings/platform-settings-not-found.exception';
import { InsufficientFundsException } from '../../../domain/exceptions/account/insufficient-funds.exception';
import { AccountEntity } from '../../../domain/entities/finance/account.entity';
import { CommissionCalculatorService } from '../../../domain/services/commission/commission-calculator.service';
import { CommissionContext } from '../../../domain/services/commission/commission-context.interface';
import { TaskEntity } from '../../../domain/entities/project/task.entity';
import { ServiceEntity } from '../../../domain/entities/project/service.entity';

@Injectable()
export class CreateContractUseCase {
  constructor(
    private readonly uow: UnitOfWorkPort,
    private readonly commissionCalculatorService: CommissionCalculatorService,
  ) {}

  public async execute(command: ICreateContractCommand) {
    if (!command.taskId && !command.serviceId) {
      throw new ContractMissingTargetException();
    }
    if (command.taskId && command.serviceId) {
      throw new ContractAmbiguousException();
    }

    return this.uow.begin(async (uow) => {
      const accountRepo = uow.getAccountRepository();
      const contractRepo = uow.getContractRepository();
      const taskRepo = uow.getTaskRepository();
      const serviceRepo = uow.getServiceRepository();
      const platformSettingsRepo = uow.getPlatformSettingsRepository();
      const commissionRuleRepo = uow.getCommissionRuleRepository();
      const subscriptionRepo = uow.getSubscriptionRepository()

      const settings = await platformSettingsRepo.get();
      if (!settings) throw new PlatformSettingsNotFoundException();

      let accountClient = await accountRepo.findByUserId(command.clientId);
      if (!accountClient) {
        accountClient = new AccountEntity(
          uuid(),
          command.clientId,
          0,
          0,
          settings.settings.storageQuotas.freeBytes,
          BigInt(0),
        );
        accountClient = await accountRepo.save(accountClient);
      }

      let accountContractor = await accountRepo.findByUserId(command.contractorId);
      if (!accountContractor) {
        accountContractor = new AccountEntity(
          uuid(),
          command.contractorId,
          0,
          0,
          settings.settings.storageQuotas.freeBytes,
          BigInt(0),
        );
        accountContractor = await accountRepo.save(accountContractor);
      }

      let task: TaskEntity | null;
      let service: ServiceEntity | null;

      if (command.taskId) {
        task = await taskRepo.findById(command.taskId);
        if (!task) throw new TaskNotFoundException();
      }
      if (command.serviceId) {
        service = await serviceRepo.findById(command.serviceId);
        if (!service) throw new ServiceNotFoundException();
      }

      if (command.amount > accountClient.availableBalance) {
        throw new InsufficientFundsException();
      }

      const rules = await commissionRuleRepo.findActive();

      const isSubscription = !!(await subscriptionRepo.findByAccountId(accountContractor.id));

      const context: CommissionContext = {
        entityType: 'CONTRACT',
        amount: command.amount,
        isSubscription: isSubscription,
      };

      const platformFee = this.commissionCalculatorService.calculate(
        context,
        rules,
      );

      accountClient.availableBalance -= command.amount;
      accountClient.frozenBalance += command.amount;
      await accountRepo.update(accountClient.id, {
        availableBalance: accountClient.availableBalance,
        frozenBalance: accountClient.frozenBalance,
      });

      const contractEntity = new ContractEntity(
        uuid(),
        command.amount,
        command.clientId,
        command.contractorId,
        new Date(),
        new Date(),
        command.taskId ?? null,
        command.serviceId ?? null,
        EnumContractStatus.SEND,
        null,
        null,
        platformFee
      );
      return contractRepo.save(contractEntity);
    });
  }
}

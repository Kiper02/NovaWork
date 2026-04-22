import { PrismaService } from '../database/orm/prisma-recource/prisma.service';
import { AccountRepository } from '../../../core/domain/repositories/finance/account.repository';
import { ChatRepository } from '../../../core/domain/repositories/chat/chat.repository';
import { ChatRepositoryImpl } from '../database/repositories/chat/chat.repository.impl';
import { AccountRepositoryImpl } from '../database/repositories/finance/account.repository.impl';
import { MessageRepository } from 'src/core/domain/repositories/chat/message.repository';
import { UnitOfWorkPort } from '../../../core/ports/uow/unit-of-work.port';
import { Injectable } from '@nestjs/common';
import { MessageRepositoryImpl } from '../database/repositories/chat/message.repository.impl';
import { GlobalRoleRepository } from 'src/core/domain/repositories/user/global-role.repository';
import { GlobalRoleRepositoryImpl } from '../database/repositories/shared/global-role.repository.impl';
import { ContractRepository } from '../../../core/domain/repositories/project/contract.repository';
import { TaskRepository } from '../../../core/domain/repositories/project/task.repository';
import { ServiceRepository } from '../../../core/domain/repositories/project/service.repository';
import { PlatformSettingsRepository } from '../../../core/domain/repositories/shared/platform-settings.repository';
import { ContractRepositoryImpl } from '../database/repositories/project/contract.repository.impl';
import { TaskRepositoryImpl } from '../database/repositories/project/task.repository.impl';
import { ServiceRepositoryImpl } from '../database/repositories/project/service.repository.impl';
import { PlatformSettingsRepositoryImpl } from '../database/repositories/shared/platform-settings.repository.impl';
import { CommissionRuleRepository } from '../../../core/domain/repositories/finance/commission-rule.repository';
import { CommissionRuleRepositoryImpl } from '../database/repositories/finance/commission-rule.repository.impl';
import { SubscriptionRepository } from '../../../core/domain/repositories/shared/subscription.repository';
import { SubscriptionRepositoryImpl } from '../database/repositories/shared/subscription.repository.impl';

@Injectable()
export class PrismaUnitOfWorkAdapter implements UnitOfWorkPort {
  private chatRepository?: ChatRepository;
  private accountRepository?: AccountRepository;
  private messageRepository?: MessageRepository;
  private globalRoleRepository?: GlobalRoleRepository;
  private contractRepository?: ContractRepository;
  private taskRepository?: TaskRepository;
  private serviceRepository?: ServiceRepository;
  private platformSettingsRepository?: PlatformSettingsRepository;
  private commissionRuleRepository?: CommissionRuleRepository;
  private subscriptionRepository?: SubscriptionRepository;

  public constructor(private readonly prismaService: PrismaService) {}

  public async begin<T>(work: (uow: UnitOfWorkPort) => Promise<T>): Promise<T> {
    return this.prismaService.$transaction(async (tx) => {
      const txUow = new PrismaUnitOfWorkAdapter(tx as any);
      return await work(txUow);
    });
  }

  public getMessageRepository(): MessageRepository {
    if (!this.messageRepository) {
      this.messageRepository = new MessageRepositoryImpl(this.prismaService);
    }
    return this.messageRepository;
  }

  public getChatRepository(): ChatRepository {
    if (!this.chatRepository) {
      this.chatRepository = new ChatRepositoryImpl(this.prismaService);
    }
    return this.chatRepository;
  }

  public getAccountRepository(): AccountRepository {
    if (!this.accountRepository) {
      this.accountRepository = new AccountRepositoryImpl(this.prismaService);
    }
    return this.accountRepository;
  }

  public globalRolesRepository(): GlobalRoleRepository {
    if (!this.globalRoleRepository) {
      this.globalRoleRepository = new GlobalRoleRepositoryImpl(
        this.prismaService,
      );
    }
    return this.globalRoleRepository;
  }

  public getContractRepository(): ContractRepository {
    if (!this.contractRepository) {
      this.contractRepository = new ContractRepositoryImpl(this.prismaService);
    }
    return this.contractRepository;
  }

  public getTaskRepository(): TaskRepository {
    if (!this.taskRepository) {
      this.taskRepository = new TaskRepositoryImpl(this.prismaService);
    }
    return this.taskRepository;
  }

  public getServiceRepository(): ServiceRepository {
    if (!this.serviceRepository) {
      this.serviceRepository = new ServiceRepositoryImpl(this.prismaService);
    }
    return this.serviceRepository;
  }

  public getPlatformSettingsRepository(): PlatformSettingsRepository {
    if (!this.platformSettingsRepository) {
      this.platformSettingsRepository = new PlatformSettingsRepositoryImpl(
        this.prismaService,
      );
    }
    return this.platformSettingsRepository;
  }

  public getCommissionRuleRepository(): CommissionRuleRepository {
    if (!this.commissionRuleRepository) {
      this.commissionRuleRepository = new CommissionRuleRepositoryImpl(
        this.prismaService,
      );
    }
    return this.commissionRuleRepository;
  }

  public getSubscriptionRepository(): SubscriptionRepository {
    if (!this.subscriptionRepository) {
      this.subscriptionRepository = new SubscriptionRepositoryImpl(this.prismaService)
    }
    return this.subscriptionRepository;
  }
}

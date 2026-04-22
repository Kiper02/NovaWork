import { ChatRepository } from '../../domain/repositories/chat/chat.repository';
import { AccountRepository } from '../../domain/repositories/finance/account.repository';
import { MessageRepository } from '../../domain/repositories/chat/message.repository';
import { GlobalRoleRepository } from '../../domain/repositories/user/global-role.repository';
import { ContractRepository } from '../../domain/repositories/project/contract.repository';
import { TaskRepository } from '../../domain/repositories/project/task.repository';
import { ServiceRepository } from '../../domain/repositories/project/service.repository';
import { PlatformSettingsRepository } from '../../domain/repositories/shared/platform-settings.repository';
import { CommissionRuleRepository } from '../../domain/repositories/finance/commission-rule.repository';
import { SubscriptionRepository } from '../../domain/repositories/shared/subscription.repository';

export abstract class UnitOfWorkPort {
  public abstract begin<T>(
    work: (uow: UnitOfWorkPort) => Promise<T>,
  ): Promise<T>;
  public abstract getChatRepository(): ChatRepository;
  public abstract getAccountRepository(): AccountRepository;
  public abstract getMessageRepository(): MessageRepository;
  public abstract globalRolesRepository(): GlobalRoleRepository;
  public abstract getContractRepository(): ContractRepository;
  public abstract getTaskRepository(): TaskRepository;
  public abstract getServiceRepository(): ServiceRepository;
  public abstract getPlatformSettingsRepository(): PlatformSettingsRepository;
  public abstract getCommissionRuleRepository(): CommissionRuleRepository;
  public abstract getSubscriptionRepository(): SubscriptionRepository
}
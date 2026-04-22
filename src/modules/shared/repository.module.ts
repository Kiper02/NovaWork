import { Global, Module } from '@nestjs/common';
import { AccountRepository } from '../../core/domain/repositories/finance/account.repository';
import { AccountRepositoryImpl } from '../../infrastructure/adapters/database/repositories/finance/account.repository.impl';
import { BidRepository } from '../../core/domain/repositories/project/bid.repository';
import { BidRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/bid.repository.impl';
import { ChatRepository } from '../../core/domain/repositories/chat/chat.repository';
import { ChatRepositoryImpl } from '../../infrastructure/adapters/database/repositories/chat/chat.repository.impl';
import { ContractRepository } from '../../core/domain/repositories/project/contract.repository';
import { ContractRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/contract.repository.impl';
import { GlobalRoleRepository } from '../../core/domain/repositories/user/global-role.repository';
import { GlobalRoleRepositoryImpl } from '../../infrastructure/adapters/database/repositories/shared/global-role.repository.impl';
import { InvitationRepository } from '../../core/domain/repositories/project/invitation.repository';
import { InvitationRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/invitation.repository.impl';
import { MessageRepository } from '../../core/domain/repositories/chat/message.repository';
import { MessageRepositoryImpl } from '../../infrastructure/adapters/database/repositories/chat/message.repository.impl';
import { PlatformSettingsRepository } from '../../core/domain/repositories/shared/platform-settings.repository';
import {
  PlatformSettingsRepositoryImpl
} from '../../infrastructure/adapters/database/repositories/shared/platform-settings.repository.impl';
import { ProfileRepository } from '../../core/domain/repositories/user/profile.repository';
import { ProfileRepositoryImpl } from '../../infrastructure/adapters/database/repositories/user/profile.repository.impl';
import { ProjectRepository } from '../../core/domain/repositories/project/project.repository';
import { ProjectRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/project.repository.impl';
import { SubscriptionRepository } from '../../core/domain/repositories/shared/subscription.repository';
import { SubscriptionRepositoryImpl } from '../../infrastructure/adapters/database/repositories/shared/subscription.repository.impl';
import { TaskRepository } from '../../core/domain/repositories/project/task.repository';
import { TaskRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/task.repository.impl';
import { UserRepository } from '../../core/domain/repositories/user/user.repository';
import { UserRepositoryImpl } from '../../infrastructure/adapters/database/repositories/user/user.repository.impl';
import { WorkspaceRepository } from '../../core/domain/repositories/project/workspace.repository';
import { WorkspaceRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/workspace.repository.impl';
import { NotificationRepository } from '../../core/domain/repositories/shared/notification.repository';
import { NotificationRepositoryImpl } from '../../infrastructure/adapters/database/repositories/shared/notification.repository.impl';
import { ServiceRepository } from '../../core/domain/repositories/project/service.repository';
import { ServiceRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/service.repository.impl';
import { TaskQueryRepository } from '../../core/domain/repositories/project/task-query.repository';
import { TaskQueryRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/task-query.repository.impl';
import { ServiceQueryRepository } from '../../core/domain/repositories/project/service-query.repository';
import { ServiceQueryRepositoryImpl } from '../../infrastructure/adapters/database/repositories/project/service-query.repository.impl';
import { UserQueryRepository } from '../../core/domain/repositories/user/user-query.repository';
import { UserQueryRepositoryImpl } from '../../infrastructure/adapters/database/repositories/user/user-query.repository.impl';
import { BeneficiaryRepository } from '../../core/domain/repositories/finance/beneficiary.repository';
import { BeneficiaryRepositoryImpl } from '../../infrastructure/adapters/database/repositories/finance/beneficiary.repository.impl';
import { BeneficiaryQueryRepository } from '../../core/domain/repositories/finance/beneficiary-query.repository';
import {
  BeneficiaryQueryRepositoryImpl
} from '../../infrastructure/adapters/database/repositories/finance/beneficiary-query.repository.impl';
import { PaymentRepository } from '../../core/domain/repositories/finance/payment.repository';
import { PaymentRepositoryImpl } from '../../infrastructure/adapters/database/repositories/finance/payment.repository.impl';
import { CommissionRuleRepository } from '../../core/domain/repositories/finance/commission-rule.repository';
import {
  CommissionRuleRepositoryImpl
} from '../../infrastructure/adapters/database/repositories/finance/commission-rule.repository.impl';
import { BankDetailsRepository } from '../../core/domain/repositories/finance/bank-details.repository';
import {
  BankDetailsRepositoryImpl
} from '../../infrastructure/adapters/database/repositories/finance/bank-details.repository.impl';


@Global()
@Module({
  providers: [
    {
      provide: AccountRepository,
      useClass: AccountRepositoryImpl,
    },
    {
      provide: BidRepository,
      useClass: BidRepositoryImpl,
    },
    {
      provide: ChatRepository,
      useClass: ChatRepositoryImpl,
    },
    {
      provide: ContractRepository,
      useClass: ContractRepositoryImpl,
    },
    {
      provide: GlobalRoleRepository,
      useClass: GlobalRoleRepositoryImpl,
    },
    {
      provide: InvitationRepository,
      useClass: InvitationRepositoryImpl,
    },
    {
      provide: MessageRepository,
      useClass: MessageRepositoryImpl,
    },
    {
      provide: NotificationRepository,
      useClass: NotificationRepositoryImpl,
    },
    {
      provide: PlatformSettingsRepository,
      useClass: PlatformSettingsRepositoryImpl,
    },
    {
      provide: ProfileRepository,
      useClass: ProfileRepositoryImpl,
    },
    {
      provide: ProjectRepository,
      useClass: ProjectRepositoryImpl,
    },
    {
      provide: SubscriptionRepository,
      useClass: SubscriptionRepositoryImpl,
    },
    {
      provide: TaskRepository,
      useClass: TaskRepositoryImpl,
    },
    {
      provide: TaskQueryRepository,
      useClass: TaskQueryRepositoryImpl,
    },
    {
      provide: ServiceRepository,
      useClass: ServiceRepositoryImpl,
    },
    {
      provide: ServiceQueryRepository,
      useClass: ServiceQueryRepositoryImpl,
    },
    {
      provide: ContractRepository,
      useClass: ContractRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: UserQueryRepository,
      useClass: UserQueryRepositoryImpl,
    },
    {
      provide: WorkspaceRepository,
      useClass: WorkspaceRepositoryImpl,
    },
    {
      provide: BeneficiaryRepository,
      useClass: BeneficiaryRepositoryImpl,
    },
    {
      provide: BeneficiaryQueryRepository,
      useClass: BeneficiaryQueryRepositoryImpl,
    },
    {
      provide: PaymentRepository,
      useClass: PaymentRepositoryImpl,
    },
    {
      provide: CommissionRuleRepository,
      useClass: CommissionRuleRepositoryImpl,
    },
    {
      provide: BankDetailsRepository,
      useClass: BankDetailsRepositoryImpl,
    },
  ],
  exports: [
    AccountRepository,
    BidRepository,
    ChatRepository,
    ContractRepository,
    GlobalRoleRepository,
    InvitationRepository,
    MessageRepository,
    NotificationRepository,
    PlatformSettingsRepository,
    ProfileRepository,
    ProjectRepository,
    SubscriptionRepository,
    TaskRepository,
    TaskQueryRepository,
    ServiceRepository,
    ServiceQueryRepository,
    ContractRepository,
    UserRepository,
    UserQueryRepository,
    WorkspaceRepository,
    BeneficiaryRepository,
    BeneficiaryQueryRepository,
    PaymentRepository,
    CommissionRuleRepository,
    BankDetailsRepository,
  ],
})
export class RepositoryModule {}
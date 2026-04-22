import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { RedisModule } from './infrastructure/adapters/redis/redis.module';
import { AuthModule } from './modules/user/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceModule } from './modules/project/workspace.module';
import { AccountModule } from './modules/finance/account.module';
import { ProfileModule } from './modules/user/profile.module';
import { PrismaModule } from './infrastructure/adapters/database/orm/prisma-recource/prisma.module';
import { TaskModule } from './modules/project/task.module';
import { ImageProcessorModule } from './modules/shared/image-processor.module';
import { StorageModule } from './modules/shared/storage.module';
import { ProjectModule } from './modules/project/project.module';
import { BidModule } from './modules/project/bid.module';
import { InvitationModule } from './modules/project/invitation.module';
import { AccessControlModule } from './modules/shared/access-control.module';
import { FileProcessorModule } from './modules/shared/file-processor.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from './modules/shared/notification.module';
import { GatewayModule } from './modules/shared/gateway.module';
import { ChatModule } from './modules/chat/chat.module';
import { RepositoryModule } from './modules/shared/repository.module';
import { MessageModule } from './modules/chat/message.module';
import { MailModule } from './modules/shared/mail.module';
import { ServiceModule } from './modules/project/service.module';
import { ContractModule } from './modules/project/contract.module';
import { UowModule } from './modules/shared/uow.module';
import { CommissionCalculateModule } from './modules/finance/commission-calculate.module';
import { BeneficiaryModule } from './modules/finance/beneficiary.module';
import { BankModule } from './modules/finance/bank.module';
import { BankDetailsModule } from './modules/finance/bank-details.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    PrismaModule,
    RedisModule,
    RepositoryModule,
    UowModule,
    ImageProcessorModule,
    CommissionCalculateModule,
    StorageModule,
    GatewayModule,
    MailModule,
    NotificationModule,
    AccessControlModule,
    FileProcessorModule,
    AuthModule,
    UserModule,
    AccountModule,
    ProfileModule,
    WorkspaceModule,
    ProjectModule,
    TaskModule,
    ServiceModule,
    ContractModule,
    BidModule,
    InvitationModule,
    ChatModule,
    MessageModule,
    BeneficiaryModule,
    BankModule,
    BankDetailsModule,
  ],
  controllers: [],
})
export class AppModule {}

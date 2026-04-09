import { Module } from '@nestjs/common';
import { UserModule } from './modules/user.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { AuthModule } from './modules/auth.module';
import { ConfigModule } from '@nestjs/config';
import { WorkspaceModule } from './modules/workspace.module';
import { AccountModule } from './modules/account.module';
import { ProfileModule } from './modules/profile.module';
import { PrismaModule } from './infrastructure/database/orm/prisma-recource/prisma.module';
import { TaskModule } from './modules/task.module';
import { GlobalRoleModule } from './modules/global-role.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    RedisModule,
    GlobalRoleModule,
    AuthModule,
    UserModule,
    AccountModule,
    ProfileModule,
    WorkspaceModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

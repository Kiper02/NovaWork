import { Global, Module } from '@nestjs/common';
import { GlobalRoleRepository } from '../core/domain/repositories/global-role.repository';
import { GlobalRoleRepositoryImpl } from '../infrastructure/database/repositories/global-role.repository.impl';

@Global()
@Module({
  providers: [
    {
      provide: GlobalRoleRepository,
      useClass: GlobalRoleRepositoryImpl,
    },
  ],
  exports: [GlobalRoleRepository],
})
export class GlobalRoleModule {}

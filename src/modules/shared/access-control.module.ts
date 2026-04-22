import { Global, Module } from '@nestjs/common';
import { AccessControlService } from '../../core/domain/services/authorization/access-control.service';

@Global()
@Module({
  providers: [
    {
      provide: AccessControlService,
      useClass: AccessControlService,
    },
  ],
  exports: [AccessControlService],
})
export class AccessControlModule {}

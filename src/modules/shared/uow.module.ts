import { Global, Module } from '@nestjs/common';
import { UnitOfWorkPort } from '../../core/ports/uow/unit-of-work.port';
import { PrismaUnitOfWorkAdapter } from '../../infrastructure/adapters/uow/prisma-unit-of-work.adapter';

@Global()
@Module({
  providers: [
    {
      provide: UnitOfWorkPort,
      useClass: PrismaUnitOfWorkAdapter,
    },
  ],
  exports: [UnitOfWorkPort],
})
export class UowModule {}

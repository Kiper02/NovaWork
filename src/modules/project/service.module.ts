import { Module } from '@nestjs/common';
import { ServiceController } from '../../presentation/controllers/service.controller';
import { CreateServiceUseCase } from '../../core/use-cases/service/create/create-service.use-case';
import { ServiceUpdateUseCase } from '../../core/use-cases/service/update/service-update.use-case';
import { FindAllServiceUseCase } from '../../core/use-cases/service/find-all/find-all-service.use-case';
import { FindServiceByIdUseCase } from '../../core/use-cases/service/find-by-id/find-service-by-id.use-case';


@Module({
  controllers: [ServiceController],
  providers: [
    CreateServiceUseCase,
    ServiceUpdateUseCase,
    FindAllServiceUseCase,
    FindServiceByIdUseCase,
  ],
})
export class ServiceModule {}

import { Global, Module } from '@nestjs/common';
import { CommissionCalculatorService } from '../../core/domain/services/commission/commission-calculator.service';

@Global()
@Module({
  providers: [
    {
      provide: CommissionCalculatorService,
      useClass: CommissionCalculatorService,
    },
  ],
  exports: [CommissionCalculatorService],
})
export class CommissionCalculateModule {}

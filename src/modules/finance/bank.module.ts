import { Global, Module } from '@nestjs/common';
import { BeneficiaryPort } from '../../core/ports/bank-payment/beneficiary/beneficiary.port';
import { BeneficiaryAdapter } from '../../infrastructure/adapters/bank/adapters/beneficiary.adapter';
import { BearerTokenStrategy } from '../../infrastructure/adapters/bank/strategies/bearer-token.strategy';
import { IdempotencyKeyStrategy } from '../../infrastructure/adapters/bank/strategies/idempotency-key.strategy';
import { MutualTLSStrategy } from '../../infrastructure/adapters/bank/strategies/mutual-tls.strategy';
import { BankClientFactory } from '../../infrastructure/adapters/bank/client/bank-client.factory';
import { AcquiringPort } from '../../core/ports/bank-payment/acquiring/acquiring.port';
import { AcquiringAdapter } from '../../infrastructure/adapters/bank/adapters/acquiring.adapter';
import { CardEncryptionService } from '../../infrastructure/adapters/bank/services/card-encryption.service';

@Global()
@Module({
  providers: [
    BearerTokenStrategy,
    IdempotencyKeyStrategy,
    MutualTLSStrategy,
    BankClientFactory,
    {
      provide: AcquiringPort,
      useClass: AcquiringAdapter,
    },
    {
      provide: BeneficiaryPort,
      useClass: BeneficiaryAdapter,
    },
    {
      provide: CardEncryptionService,
      useClass: CardEncryptionService,
    },
  ],
  exports: [AcquiringPort, BeneficiaryPort],
})
export class BankModule {}

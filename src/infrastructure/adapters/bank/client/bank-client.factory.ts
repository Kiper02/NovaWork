import { Injectable } from '@nestjs/common';
import { TBankApiClient } from './tbank-api-client';
import { BearerTokenStrategy } from '../strategies/bearer-token.strategy';
import { IdempotencyKeyStrategy } from '../strategies/idempotency-key.strategy';
import { MutualTLSStrategy } from '../strategies/mutual-tls.strategy';

@Injectable()
export class BankClientFactory {
  public constructor(
    private readonly bearerTokenStrategy: BearerTokenStrategy,
    private readonly idempotencyKeyStrategy: IdempotencyKeyStrategy,
    private readonly mutualTlsStrategy: MutualTLSStrategy,
  ) {}

  public getBeneficiaryClient(): TBankApiClient {
    return new TBankApiClient([
      this.bearerTokenStrategy,
      this.idempotencyKeyStrategy,
      this.mutualTlsStrategy,
    ]);
  }

  public getPayoutClient(): TBankApiClient {
    return new TBankApiClient([
      this.bearerTokenStrategy,
      this.idempotencyKeyStrategy,
      this.mutualTlsStrategy,
    ]);
  }

  public getAcquiringClient(): TBankApiClient {
    return new TBankApiClient([]);
  }
}
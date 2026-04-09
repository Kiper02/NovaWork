import { PaymentResultValueObject } from '../domain/value-objects/payments/payment-result.value-object';
import { PaymentRequestValueObject } from '../domain/value-objects/payments/payment-request.value-object';

export abstract class BankPaymentPort {
  public abstract transferToBeneficiary(
    request: PaymentRequestValueObject,
  ): Promise<PaymentResultValueObject>;
}
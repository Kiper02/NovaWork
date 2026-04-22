import { BadRequestException } from '@nestjs/common';

export class MissingPaymentDetailsException extends BadRequestException {
  constructor() {
    super('Payment details are required for bank details type PAYMENT_DETAILS');
  }
}

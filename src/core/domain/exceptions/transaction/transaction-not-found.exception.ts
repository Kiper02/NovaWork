import { NotFoundException } from '@nestjs/common';
import { ERROR_CODES } from '../../constants/error-codes.constants';

export class TransactionNotFoundException extends NotFoundException {
  public constructor() {
    super({
      code: ERROR_CODES.TRANSACTION_NOT_FOUND,
      message: 'Транзакция не найдена',
    });
  }
}

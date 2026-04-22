import { BadRequestException } from '@nestjs/common';

export class MissingCardDetailsException extends BadRequestException {
  constructor() {
    super('Card details are required for bank details type CARD');
  }
}

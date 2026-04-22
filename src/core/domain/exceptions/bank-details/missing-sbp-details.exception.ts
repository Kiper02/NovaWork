import { BadRequestException } from '@nestjs/common';

export class MissingSbpDetailsException extends BadRequestException {
  constructor() {
    super('SBP details are required for bank details type SBP');
  }
}

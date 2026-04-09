import * as crypto from 'crypto';
import { VerificationCodeGeneratorPort } from '../../core/ports/verification-code-generator.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class VerificationCodeGenerator implements VerificationCodeGeneratorPort {
  generateCode(): string {
    return crypto.randomInt(100000, 999999).toString();
  }
  generateExpiresAt(): Date {
    return new Date(Date.now() + 10 * 60 * 1000);
  }
}

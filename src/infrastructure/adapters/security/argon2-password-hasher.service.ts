import * as argon2 from 'argon2';
import { PasswordHasherPort } from '../../../core/ports/password-hasher/password-hasher.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Argon2PasswordHasher implements PasswordHasherPort {
  async verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
  async hash(plain: string): Promise<string> {
    return argon2.hash(plain);
  }
}

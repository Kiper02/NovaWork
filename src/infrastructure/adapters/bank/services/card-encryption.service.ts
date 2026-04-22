import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CardEncryptionService {
  private readonly publicKey: string;

  public constructor() {
    const __dirname = path.resolve();
    const keyPath = path.join(__dirname, 'certs', 'public-key-card-data.txt');
    this.publicKey = fs.readFileSync(keyPath, 'utf8');
  }

  public encryptCardData(
    pan: string,
    expDate: string,
    cardHolder?: string,
    cvv?: string,
  ): string {
    const parts = [`PAN=${pan}`];
    if (expDate) parts.push(`ExpDate=${expDate}`);
    if (cardHolder) parts.push(`CardHolder=${cardHolder}`);
    if (cvv) parts.push(`CVV=${cvv}`);
    const plain = parts.join(';');

    const encrypted = crypto.publicEncrypt(
      {
        key: this.publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(plain, 'utf8'),
    );
    return encrypted.toString('base64');
  }
}

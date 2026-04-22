import { EnumBankDetailsType } from '../../entities/finance/bank-details.entity';

export interface CardDetails {
  type: EnumBankDetailsType.CARD;
  bankDetailsId: string;
  cardId?: string;
  maskedPan: string
  expiryMonth?: number;
  expiryYear?: number;
  cardHolder?: string;
  isDefault: boolean;
}

export interface SbpDetails {
  type: EnumBankDetailsType.SBP;
  bankDetailsId: string;
  maskedPhone: string;
  bankId?: string;
  isDefault: boolean;
}

export interface PaymentDetails {
  type: EnumBankDetailsType.PAYMENT_DETAILS;
  bankDetailsId: string;
  maskedAccount: string;
  bankName: string;
  bik?: string;
  isDefault: boolean;
}

export type BankDetails = CardDetails | SbpDetails | PaymentDetails;

export class BankDetailsValueObject {
  private constructor(private readonly value: BankDetails) {}

  public static createCard(
    data: Omit<CardDetails, 'type'>,
  ): BankDetailsValueObject {
    return new BankDetailsValueObject({
      type: EnumBankDetailsType.CARD,
      ...data,
    });
  }

  public static createSbp(
    data: Omit<SbpDetails, 'type'>,
  ): BankDetailsValueObject {
    return new BankDetailsValueObject({
      type: EnumBankDetailsType.SBP,
      ...data,
    });
  }

  public static createPayment(
    data: Omit<PaymentDetails, 'type'>,
  ): BankDetailsValueObject {
    return new BankDetailsValueObject({
      type: EnumBankDetailsType.PAYMENT_DETAILS,
      ...data,
    });
  }

  public static maskPan(pan: string): string {
    if (!pan || pan.length < 4) return pan;
    return `**** **** **** ${pan.slice(-4)}`;
  }

  public static maskPhone(phone: string): string {
    if (!phone || phone.length < 6) return phone;
    const countryCode = phone.slice(0, 2);
    const last4 = phone.slice(-4);
    return `${countryCode}***${last4}`;
  }

  public static maskAccount(account: string): string {
    if (!account || account.length < 4) return account;
    return `****${account.slice(-4)}`;
  }

  public static parseExpiryDate(
    expiryDate: string,
  ): { month: number; year: number } | null {
    if (!expiryDate || expiryDate.length !== 4) return null;
    const month = parseInt(expiryDate.slice(0, 2), 10);
    const year = 2000 + parseInt(expiryDate.slice(2, 4), 10);
    if (month < 1 || month > 12) return null;
    return { month, year };
  }

  public getValue() {
    return this.value;
  }
}
